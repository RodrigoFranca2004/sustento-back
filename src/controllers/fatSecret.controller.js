import * as FatSecretService from "../services/fatSecret.service.js";

export async function searchAliment(req, res) {
  try {
    const { query, maxResults, pageNumber } = req.query;
    if (!query) {
      return res.status(400).json({ error: "O parâmetro 'query' é obrigatório" });
    }

    const results = await FatSecretService.searchAliment({query, maxResults, pageNumber});
    return res.json(results);
  } catch (err) {
    res.status(400).json({error: err.message}) // send the error to a treatment middleware
  }
}
