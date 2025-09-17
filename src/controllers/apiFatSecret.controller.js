import { searchFood } from "../services/apiFatSecret.service.js";

export async function searchFoodController(req, res, next) {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "O parâmetro 'query' é obrigatório" });
    }

    const results = await searchFood(query);
    return res.json(results);
  } catch (err) {
    next(err); // send the error to a treatment middleware
  }
}
