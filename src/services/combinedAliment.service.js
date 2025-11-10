import * as alimentDbService from './aliment.service.js';
import * as openFoodService from './openFood.service.js';
import { prisma } from "../config/prisma.js";


function transformDbAliment(dbAliment) {
    const {
        calories_100g, protein_100g, carbs_100g, fat_100g, 
        saturated_fat_100g, fiber_100g, sugar_100g, sodium_100g,
        ...restOfAliment
    } = dbAliment;

    return {
        id: restOfAliment.aliment_id,
        barCode: restOfAliment.bar_code,
        name: restOfAliment.name,
        brand: restOfAliment.brand,
        imageUrl: restOfAliment.image_url,
        quantity: restOfAliment.quantity,
        ingredients: restOfAliment.ingredients,
        nutriScore: restOfAliment.nutri_score,
        novaGroup: restOfAliment.nova_group,
        anvisaWarnings: restOfAliment.anvisa_warnings,
        dietaryInfo: restOfAliment.dietary_info,
        
        nutrients: {
            calories_100g: Number(calories_100g),
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

export async function searchCombined({ query, maxResults = 20, pageNumber = 1 }) {
    
    if (!query) {
        const allLocalAliments = await alimentDbService.listAliments();
        return {
            source: 'database_full_list',
            products: allLocalAliments,
        };
    }

    const localResultsRaw = await alimentDbService.searchDbAliments(query);
    const localResults = localResultsRaw.map(transformDbAliment);

    let apiResults = [];
    const remainingLimit = maxResults - localResults.length;

    if (remainingLimit > 0) {
        const apiResponse = await openFoodService.searchAliment({
            query,
            maxResults: remainingLimit,
            pageNumber,
        });
        
        apiResults = apiResponse.products.filter(
            apiProduct => apiProduct
        );
    } 

    const combinedProducts = [...localResults, ...apiResults];

    return {
        source: 'combined_search',
        products: combinedProducts.slice(0, maxResults),
    };
}