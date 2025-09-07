import * as MealPlanService from "../services/mealPlan.service.js"

export async function createMealPlan(req, res) {
  try {
    const mealPlan = await MealPlanService.createMealPlan(req.body);
    res.status(201).json(mealPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listMealPlans(req, res) {
  const mealPlans = await MealPlanService.listMealPlans();
  res.json(mealPlans);
}

export async function getMealPlan(req, res) {
  const mealPlan = await MealPlanService.getMealPlan(req.params.id);
  if (!mealPlan) return res.status(404).json({ error: "Meal plan not found" });
  res.json(mealPlan);
}

export async function updateMealPlan(req, res) {
  try {
    const mealPlan = await MealPlanService.updateMealPlan(req.params.id, req.body);
    res.json(mealPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteMealPlan(req, res) {
  try {
    await MealPlanService.deleteMealPlan(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

