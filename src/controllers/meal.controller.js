import * as MealService from "../services/meal.service.js"

export async function createMeal(req, res) {
  try {
    const meal = await MealService.createMeal(req.body);
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listMeals(req, res) {
  const meals = await MealService.listMeals();
  res.json(meals);
}

export async function getMeal(req, res) {
  const meal = await MealService.getMeal(req.params.id);
  if (!meal) return res.status(404).json({ error: "Meal not found" });
  res.json(meal);
}

export async function updateMeal(req, res) {
  try {
    const meal = await MealService.updateMeal(req.params.id, req.body);
    res.json(meal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteMeal(req, res) {
  try {
    await MealService.deleteMeal(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

