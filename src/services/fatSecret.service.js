import fetch from "node-fetch";

const FATSECRET_CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const FATSECRET_CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;

const FATSECRET_TOKEN_URL = process.env.FATSECRET_TOKEN_URL;
const FATSECRET_SEARCH_URL = process.env.FATSECRET_SEARCH_URL;

// Generates the access token
async function getAccessToken() {
  const credentials = `${FATSECRET_CLIENT_ID}:${FATSECRET_CLIENT_SECRET}`;
  // Encode usando Buffer nativo
  const b64Credentials = Buffer.from(credentials).toString("base64");

  const response = await fetch(FATSECRET_TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${b64Credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ grant_type: "client_credentials" })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Erro ao gerar token: ${response.status} - ${err}`);
  }

  const data = await response.json();
  const accessToken = data.access_token
  return accessToken;
}

// Search for the specified aliments
export async function searchAliment(query, maxResults = 15, pageNumber = 0) {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    method: "foods.search",
    search_expression: query,
    max_results: maxResults,
    page_number: pageNumber,
    format: "json"
  });

  const response = await fetch(`${FATSECRET_SEARCH_URL}?${params.toString()}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Erro na busca: ${response.status} - ${err}`);
  }

  return response.json();
}
