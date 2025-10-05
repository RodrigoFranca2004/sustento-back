import fetch from "node-fetch";

const OPENFOODFACTS_SEARCH_URL = "https://br.openfoodfacts.org/cgi/search.pl";

/**
 * NEW FUNCTION: Classifies a product based on ANVISA's frontal labeling rules.
 * @param {object} product - The raw product object to check its unit (g or ml).
 * @param {object} nutrients - The cleaned nutrients object (per 100g/ml).
 * @returns {string[]} - An array of warnings (e.g., ["ALTO EM GORDURA SATURADA"]).
 */

function getAnvisaWarnings(product, nutrients) {
  const warnings = [];

  // Determine if the product is liquid or solid to apply the correct thresholds
  const isLiquid = product.quantity?.toLowerCase().includes("ml") || product.quantity?.toLowerCase().includes("l");

  // ANVISA's thresholds
  const limits = {
    solid: {
      saturatedFat: 6,  // g per 100g
      sodium: 600,      // mg per 100g
      addedSugar: 15,   // g per 100g
    },
    liquid: {
      saturatedFat: 3,  // g per 100ml
      sodium: 300,      // mg per 100ml
      addedSugar: 7.5,  // g per 100ml
    },
  };

  const activeLimits = isLiquid ? limits.liquid : limits.solid;

  // 1. Check Saturated Fat
  if (nutrients.saturatedFat_100g >= activeLimits.saturatedFat) {
    warnings.push("ALTO EM GORDURA SATURADA");
  }

  // 2. Check Sodium (API gives sodium in 'g', ANVISA rule is in 'mg', so convert)
  const sodiumInMg = nutrients.sodium_100g * 1000;
  if (sodiumInMg >= activeLimits.sodium) {
    warnings.push("ALTO EM SÓDIO");
  }

  // 3. Check Added Sugar (using total sugars as a proxy)
  if (nutrients.sugar_100g >= activeLimits.addedSugar) {
    // The asterisk denotes this is based on total sugars, not added sugars.
    warnings.push("ALTO EM AÇÚCAR ADICIONADO*");
  }

  return warnings;
}

/**
 * Extracts and cleans only the essential data from a full product object.
 * @param {object} product - The raw product object from the API.
 * @returns {object|null} - A simplified product object.
 */
function transformProduct(product) {
  if (!product || !product.code || !product.product_name) {
    return null;
  }

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

  // NEW: Call the ANVISA classification function
  const anvisaWarnings = getAnvisaWarnings(product, cleanedNutrients);

  return {
    id: product.code,
    name: product.product_name_pt ?? product.product_name,
    brand: product.brands ?? "N/A",
    imageUrl: product.image_url,
    quantity: product.quantity,
    servingSize: product.serving_size,
    nutrients: cleanedNutrients,
    ingredients: product.ingredients_text_pt ?? null,
    nutriScore: product.nutriscore_grade.toUpperCase() ?? "N/A",
    novaGroup: product.nova_group ?? "N/A",
    // NEW FIELD: Add the warnings to the final object
    anvisaWarnings: anvisaWarnings,
  };
}

// ... (prepareParams and searchAliment functions remain the same as the previous version)

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