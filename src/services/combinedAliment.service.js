import * as alimentDbService from './aliment.service.js';
import * as openFoodService from './openFood.service.js';


/**
 * Transforma um objeto de alimento do banco de dados para o formato de saída padrão.
 * @param {object} dbAliment - O objeto de alimento vindo do Prisma.
 * @returns {object} - O objeto de alimento no formato unificado.
 */
function transformDbAliment(dbAliment) {
    // Separa os campos de nutrientes do resto do objeto
    const {
        calories_100g, protein_100g, carbs_100g, fat_100g, 
        saturated_fat_100g, fiber_100g, sugar_100g, sodium_100g,
        ...restOfAliment // Pega todo o resto do objeto
    } = dbAliment;

    // Retorna o objeto reestruturado
    return {
        id: restOfAliment.aliment_id,      // Renomeia a chave do ID
        barCode: restOfAliment.bar_code,
        name: restOfAliment.name,
        brand: restOfAliment.brand,
        imageUrl: restOfAliment.image_url, // Renomeia a chave da imagem
        quantity: restOfAliment.quantity,
        ingredients: restOfAliment.ingredients,
        nutriScore: restOfAliment.nutri_score,
        novaGroup: restOfAliment.nova_group,
        anvisaWarnings: restOfAliment.anvisa_warnings, // Já é um array
        dietaryInfo: restOfAliment.dietary_info,       // Já é um JSON
        
        // Cria o objeto aninhado 'nutrients'
        nutrients: {
            calories_100g: Number(calories_100g), // Converte de Decimal para Number
            protein_100g: Number(protein_100g),
            carbs_100g: Number(carbs_100g),
            fat_100g: Number(fat_100g),
            saturatedFat_100g: Number(saturated_fat_100g),
            fiber_100g: Number(fiber_100g),
            sugar_100g: Number(sugar_100g),
            sodium_100g: Number(sodium_100g),
        },
    };
}

/**
 * Orquestra a busca de alimentos no banco de dados local e na API Open Food Facts.
 * Se nenhuma query for fornecida, retorna todos os alimentos do banco local.
 * @param {object} searchParams - Parâmetros de busca { query, maxResults, pageNumber }
 * @returns {object} - Um objeto com a lista de produtos combinada.
 */
export async function searchCombined({ query, maxResults = 20, pageNumber = 1 }) {
  // Se não houver query, retorna a lista completa do banco de dados local.
  if (!query) {
    console.log("Orquestrador: Nenhuma query, retornando lista completa do DB.");
    const allLocalAliments = await alimentDbService.listAliments();
    return {
      source: 'database_full_list',
      products: allLocalAliments,
    };
  }

  // 1. BUSCAR PRIMEIRO NO BANCO DE DADOS LOCAL
  const localResultsRaw = await alimentDbService.searchDbAliments(query);
  const localResults = localResultsRaw.map(transformDbAliment);

  // 2. BUSCAR NA API EXTERNA SE O LIMITE NÃO FOI ATINGIDO
  let apiResults = [];
  const remainingLimit = maxResults - localResults.length;

  if (remainingLimit > 0) {
    console.log(`Orquestrador: Buscando ${remainingLimit} resultados adicionais na API.`);
    const apiResponse = await openFoodService.searchAliment({
      query,
      maxResults: remainingLimit,
      pageNumber,
    });
    
    apiResults = apiResponse.products.filter(
      apiProduct => apiProduct
    );
  } else {
    console.log("Orquestrador: Limite de resultados atingido apenas com o banco de dados.");
  }

  const combinedProducts = [...localResults, ...apiResults];

  return {
    source: 'combined_search',
    products: combinedProducts.slice(0, maxResults), // Garante o limite final
  };
}