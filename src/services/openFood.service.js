import fetch from "node-fetch";

// URL for search in Open Food Facts.
// Using 'br' may bring better results to the brazilian context.
const OPENFOODFACTS_SEARCH_URL = "https://br.openfoodfacts.org/cgi/search.pl";

function prepareParams({ maxResults, pageNumber }) {
  const pageSize = Number(maxResults) || 15;

  // Be aware: Pagination starts in 1
  const pageNumberInt = Number(pageNumber) || 1;

  return { pageSize, pageNumberInt };
}

/**
 * Busca por alimentos na API da Open Food Facts usando uma query de texto.
 * @param {object} options - Search options.
 * @param {string} options.query - The term to be searched.
 * @param {number} [options.maxResults=15] - Max number of results per page.
 * @param {number} [options.pageNumber=1] - The active page number.
 * @returns {Promise<object>} - JSON API response.
 */

export async function searchAliment({
  query,
  maxResults = 15,
  pageNumber = 1,
}) {
  const { pageSize, pageNumberInt } = prepareParams({
    maxResults,
    pageNumber,
  });

  const params = new URLSearchParams({
    search_terms: query,      // Search text
    search_simple: 1,         // Activate simple search
    action: "process",        // Action to be executed on Server
    json: 1,                  // Guarantee response to be a JSON
    page_size: pageSize,      // 'max_results'
    page: pageNumberInt,      // Page number
  });

  try {
    const response = await fetch(`${OPENFOODFACTS_SEARCH_URL}?${params.toString()}`, {
      headers: {
        // ESSENCIAL: A Open Food Facts exige um User-Agent para identificar o seu app.
        "User-Agent": "SustentoApp/0.1",
      },
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Erro na busca: ${response.status} - ${err}`);
    }

    return response.json();
  } catch (error) {
    console.error("Falha ao buscar na Open Food Facts:", error);
    throw error; // Propaga o erro para quem chamou a função
  }
}