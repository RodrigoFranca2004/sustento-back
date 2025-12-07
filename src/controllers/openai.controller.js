import * as aiService from "../services/openai.service.js";

export async function suggestDiet(req, res) {
  try {
    const diet = await aiService.generateDietSuggestion(req.body);
    res.json(diet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
