const ExcelJs = require("exceljs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * Tenta converter um valor para número. Se falhar ou o valor for nulo/vazio, retorna null.
 * @param {*} value O valor a ser convertido.
 * @returns {number | null}
 */
function toNumberOrNull(value) {
  if (value === null || value === "") {
    return null;
  }
  const num = Number(value);
  return !isNaN(num) ? num : null;
}

async function importTaco() {
  const workbook = new ExcelJs.Workbook();
  const filePath = "data/taco_db.xlsx";

  try {
    //=====================================================================================================================
    // ETAPA 1: Cria o buffer para ler a planilha, define os arrays com dados a serem inseridos e erros a serem tratados
    //=====================================================================================================================
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const insertData = [];
    const validationErrors = [];

    // Loop que itera sobre todas as linhas da planilha
    worksheet.eachRow(
      { includeEmpty: false, firstRow: 2 },
      (row, rowNumber) => {
        // =================================================================
        // ETAPA 2: Coletar todos os dados da linha em um único objeto
        // =================================================================
        const rowData = {
          id: row.getCell(1).value,
          name: row.getCell(2).value,
          calories_100g: row.getCell(4).value,
          protein_100g: row.getCell(6).value,
          fat_100g: row.getCell(7).value,
          carbs_100g: row.getCell(9).value,
          fiber_100g: row.getCell(10).value,
          sodium_100g: row.getCell(18).value,
          nova_group: row.getCell(30).value, 
          anvisa_warnings: row.getCell(31).value,
          vegan_status: row.getCell(32).value,
          vegetarian_status: row.getCell(33).value,
          allergens: row.getCell(34).value,
          brand: row.getCell(35).value,
          nutri_score: row.getCell(36).value,
          traces: row.getCell(37).value,
        };

        // =================================================================
        // ETAPA 3: Validar os dados essenciais da linha
        // =================================================================
        const isAlimentRow = Boolean(
          rowData.id !== null && rowData.id !== "" && !isNaN(Number(rowData.id))
        );

        // Pulando linhas que não são alimentos
        if (!isAlimentRow) {
          return;
        }

        // Validação de campos obrigatórios
        if (!rowData?.name) {
          validationErrors.push({
            row: rowNumber,
            reason: `The mandatory field "name" was not found.`,
          });
          return;
        }

        // =================================================================
        // ETAPA 4: Transformar e preparar o objeto para inserção
        // =================================================================
        const alimentToInsert = {
          aliment_id: toNumberOrNull(rowData.id),
          name: String(rowData.name),
          brand: rowData.brand ? String(rowData.brand) : null,
          anvisa_warnings: rowData.anvisa_warnings ? String(rowData.anvisa_warnings) : null,
          vegan_status: rowData.vegan_status ? String(rowData.vegan_status) : null,
          vegetarian_status: rowData.vegetarian_status ? String(rowData.vegetarian_status) : null,
          allergens: rowData.allergens ? String(rowData.allergens) : null,
          nutri_score: rowData.nutri_score ? String(rowData.nutri_score) : null,
          traces: rowData.traces ? String(rowData.traces) : null,

          // Valores numéricos
          nova_group: toNumberOrNull(rowData.nova_group),
          calories_100g: toNumberOrNull(rowData.calories_100g)?.toFixed(2),
          protein_100g: toNumberOrNull(rowData.protein_100g)?.toFixed(2),
          fat_100g: toNumberOrNull(rowData.fat_100g)?.toFixed(2),
          carbs_100g: toNumberOrNull(rowData.carbs_100g)?.toFixed(2),
          fiber_100g: toNumberOrNull(rowData.fiber_100g)?.toFixed(2),
          sodium_100g: toNumberOrNull(rowData.sodium_100g)?.toFixed(2),

          // Campos que não estão no Excel (defininir valor padrão)
          dietary_info: null,
          saturated_fat_100g: null,
          sugar_100g: null,
          ingredients: null,
          bar_code: null,
          image_url: null,
          quantity: null,
        };

        insertData.push(alimentToInsert);
      }
    );

    //======================================================================================================================================
    // ETAPA 5: Decidir se a importação deve prosseguir
    //======================================================================================================================================

    if (validationErrors.length > 0) {
      console.error("❌ Data importing interrupted. Fix the following rows:");
      validationErrors.forEach((err) => {
        console.error(`  - Line ${err.row}: ${err.reason}`);
      });
      return;
    }

    console.log("✔️ Validation completed. All valid data.");

    if (insertData.length > 0) {
      console.log(`Starting insertion of ${insertData.length} rows...`);
      const result = await prisma.aliments.createMany({
        data: insertData,
        skipDuplicates: true,
      });

      console.log(`🎉 ${result.count} inserted aliments!`);
    } else {
      console.log("No valid data available.");
    }
  } catch (err) {
    console.error("An error has occurred during data importing", err);
  } finally {
    await prisma.$disconnect();
  }
}

importTaco();
