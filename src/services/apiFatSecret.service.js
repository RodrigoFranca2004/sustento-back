import fetch from "node-fetch";

const CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;

const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";
const SEARCH_URL = "https://platform.fatsecret.com/rest/server.api";

// Generates the access token
async function getAccessToken() {
  const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
  // Encode usando Buffer nativo
  const b64Credentials = Buffer.from(credentials).toString("base64");

  const response = await fetch(TOKEN_URL, {
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
  return data.access_token;
}

// Search for the specified aliments
export async function searchFood(query, maxResults = 5, pageNumber = 0) {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    method: "foods.search",
    search_expression: query,
    max_results: maxResults,
    page_number: pageNumber,
    format: "json"
  });

  const response = await fetch(`${SEARCH_URL}?${params.toString()}`, {
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
