import * as MealAlimentService from "../services/mealAliment.service.js"

export async function createMealAliment(req, res) {
  try {
    const mealAliment = await MealAlimentService.createMealAliment(req.body);
    res.status(201).json(mealAliment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listMealAliments(req, res) {
  const mealAliments = await MealAlimentService.listMealAliments();
  res.json(mealAliments);
}

export async function getMealAliment(req, res) {
  const mealAliment = await MealAlimentService.getMealAliment(req.params.id);
  if (!mealAliment) return res.status(404).json({ error: "Meal_Aliment not found" });
  res.json(mealAliment);
}

export async function updateMealAliment(req, res) {
  try {
    const mealAliment = await MealAlimentService.updateMealAliment(req.params.id, req.body);
    res.json(mealAliment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteMealAliment(req, res) {
  try {
    await MealAlimentService.deleteMealAliment(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

