import fetch from "node-fetch";

const OPENFOODFACTS_SEARCH_URL = process.env.OPENFOODFACTS_SEARCH_URL;

// ... (a função getAnvisaWarnings permanece a mesma)
function getAnvisaWarnings(product, nutrients) {
    const warnings = [];
    const isLiquid = product.quantity?.toLowerCase().includes("ml") || product.quantity?.toLowerCase().includes("l");
    const limits = {
        solid: { saturatedFat: 6, sodium: 600, addedSugar: 15 },
        liquid: { saturatedFat: 3, sodium: 300, addedSugar: 7.5 },
    };
    const activeLimits = isLiquid ? limits.liquid : limits.solid;
    if (nutrients.saturatedFat_100g >= activeLimits.saturatedFat) {
        warnings.push("ALTO EM GORDURA SATURADA");
    }
    const sodiumInMg = nutrients.sodium_100g * 1000;
    if (sodiumInMg >= activeLimits.sodium) {
        warnings.push("ALTO EM SÓDIO");
    }
    if (nutrients.sugar_100g >= activeLimits.addedSugar) {
        warnings.push("ALTO EM AÇÚCAR ADICIONADO*");
    }
    return warnings;
}

/**
 * Extracts, cleans, and translates essential data from a full product object.
 * @param {object} product - The raw product object from the API.
 * @returns {object|null} - A simplified, translated product object.
 */

function transformProduct(product) {
    if (!product || !product.code || !product.product_name) {
        return null;
    }

    const translationMap = {
        'vegan': 'Vegano', 'non-vegan': 'Não Vegano', 'vegetarian': 'Vegetariano',
        'non-vegetarian': 'Não Vegetariano', 'unknown': 'Desconhecido', 'gluten-free': 'Sem Glúten',
        'gluten': 'Glúten', 'milk': 'Leite', 'eggs': 'Ovos', 'nuts': 'Frutos de Casca Rija',
        'peanuts': 'Amendoim', 'soybeans': 'Soja', 'fish': 'Peixe', 'crustaceans': 'Crustáceos',
        'molluscs': 'Moluscos', 'mustard': 'Mostarda', 'sesame-seeds': 'Sementes de Gergelim',
        'celery': 'Aipo', 'lupin': 'Tremoço', 'sulphur-dioxide-and-sulphites': 'Dióxido de Enxofre e Sulfitos',
    };

    const getDietaryStatus = (type) => {
        const certifiedLabel = `en:${type}`;
        if (product.labels_tags?.includes(certifiedLabel)) {
            return { status: type, source: 'certificado' };
        }
        const analysisLabel = `en:${type}`;
        const nonAnalysisLabel = `en:non-${type}`;
        if (product.ingredients_analysis_tags?.includes(analysisLabel)) {
            return { status: type, source: 'análise' };
        }
        if (product.ingredients_analysis_tags?.includes(nonAnalysisLabel)) {
            return { status: `non-${type}`, source: 'análise' };
        }
        return { status: 'unknown', source: null };
    };
    
    const translateTags = (tags = []) => tags
        .map(tag => tag.replace("en:", ""))
        .map(cleanedTag => translationMap[cleanedTag] || cleanedTag);

    const getGlutenStatus = () => {
        if (product.labels_tags?.includes('en:gluten-free')) return 'Sem Glúten';
        if (product.allergens_hierarchy?.includes('en:gluten')) return 'Contém Glúten';
        if (product.traces_hierarchy?.includes('en:gluten')) return 'Pode Conter Glúten';
        return 'Não Informado';
    };

    const cleanedNutrients = {
        calories_100g: product.nutriments?.["energy-kcal_100g"] ?? null,
        proteins_100g: product.nutriments?.proteins_100g ?? null,
        carbs_100g: product.nutriments?.carbohydrates_100g ?? null,
        fat_100g: product.nutriments?.fat_100g ?? null,
        fiber_100g: product.nutriments?.fiber_100g ?? null,
        sugar_100g: product.nutriments?.sugars_100g ?? null,
        saturatedFat_100g: product.nutriments?.["saturated-fat_100g"] ?? null,
        sodium_100g: product.nutriments?.sodium_100g ?? null,
    };

    const anvisaWarnings = getAnvisaWarnings(product, cleanedNutrients);
    
    const veganInfo = getDietaryStatus('vegan');
    const vegetarianInfo = getDietaryStatus('vegetarian');

    return {
        id: product.code,
        name: product.product_name_pt ?? product.product_name,
        brand: product.brands ?? "N/A",
        imageUrl: product.image_url,
        quantity: product.quantity,
        nutrients: cleanedNutrients, // Agora este objeto terá os dados corretos
        ingredients: product.ingredients_text_pt ?? null,
        nutriScore: product.nutriscore_grade.toUpperCase() ?? "N/A",
        novaGroup: product.nova_group ?? "N/A",
        anvisaWarnings: anvisaWarnings,
        dietaryInfo: {
            vegan: {
                status: translationMap[veganInfo.status],
                fonte: veganInfo.source ? (veganInfo.source === 'certificado' ? 'Certificado' : 'Análise') : null
            },
            vegetarian: {
                status: translationMap[vegetarianInfo.status],
                fonte: vegetarianInfo.source ? (vegetarianInfo.source === 'certificado' ? 'Certificado' : 'Análise') : null
            },
            statusGluten: getGlutenStatus(),
            alergenos: translateTags(product.allergens_hierarchy),
            tracos: translateTags(product.traces_hierarchy),
        }
    };
}

function prepareParams({ maxResults, pageNumber }) {
    const pageSize = Number(maxResults) || 20;
    const pageNumberInt = Number(pageNumber) || 1;
    return { pageSize, pageNumberInt };
}
  
export async function searchAliment({
    query,
    maxResults = 20,
    pageNumber = 1,
}) {
    const { pageSize, pageNumberInt } = prepareParams({
      maxResults,
      pageNumber,
    });
  
    const params = new URLSearchParams({
      search_terms: query,
      search_simple: 1,
      action: "process",
      json: 1,
      page_size: pageSize,
      page: pageNumberInt,
    });
  
    try {
      const response = await fetch(`${OPENFOODFACTS_SEARCH_URL}?${params.toString()}`, {
        headers: {
          "User-Agent": "MeuAppDeDieta/1.0 - (seu-site-ou-contato.com)",
        },
      });
  
      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Search error: ${response.status} - ${err}`);
      }
  
      const data = await response.json();
  
      const cleanedProducts = data.products
        .map(transformProduct)
        .filter(p => p !== null);
  
      return {
        count: data.count,
        page: data.page,
        pageSize: data.page_size,
        products: cleanedProducts,
      };
  
    } catch (error) {
      console.error("Failed to fetch from Open Food Facts:", error);
      throw error;
    }
}