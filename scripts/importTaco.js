const ExcelJs = require("exceljs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function importTaco() {
  const workbook = new ExcelJs.Workbook();
  const filePath = "data/taco_db.xlsx";

  try {
    
    // Cria o buffer do arquivo
    await workbook.xlsx.readFile(filePath);

    // Pega a primeira planilha
    const worksheet = workbook.getWorksheet(1);

    const data = [];

    // Itera sobre cada linha
    worksheet.eachRow(
      { includeEmpty: false, firstRow: 2 },
      (row, rowNumber) => {

        // Seleção de colunas a serem pegas
        const name = row.getCell(1).value;
        const email = row.getCell(2).value;
        const age = row.getCell(3).value;


        // Validação de campos obrigatórios
        if (name && email && age) {
          data.push({
            name: name.toString(),
            email: email.toString(),
            age: age ? parseInt(age, 10) : null,
          });
        } else {
          console.warn(`Invalid data at row ${rowNumber}. Skipping.`);
        }
      }
    );

    if (data.length > 0) {
      const result = await prisma.aliments.createMany({
        data,
        skipDuplicates: true,
      });

      console.log(`${result.count} inserted aliments!`);
    } else {
      console.log("No valid data available.");
    }
  } catch (err) {
    console.error("An error has occurred during data importing", error);
  } finally {
    await prisma.$disconnect();
  }
}

importTaco();
