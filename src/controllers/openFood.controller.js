import * as OpenFoodService from "../services/openFood.service.js";

export async function searchAliment(req, res) {
  try {
    const { query, maxResults, pageNumber } = req.query;

    if (!query) {
      return res.status(400).json({ error: "The 'query' parameter is required" });
    }

    const results = await OpenFoodService.searchAliment({
      query,
      maxResults,
      pageNumber,
    });

    return res.json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}