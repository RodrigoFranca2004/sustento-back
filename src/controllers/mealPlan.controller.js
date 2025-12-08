import * as MealPlanService from "../services/mealPlan.service.js"

export async function createMealPlan(req, res) {
  try {
    const mealPlan = await MealPlanService.createMealPlan(req.body);
    res.status(201).json(mealPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function suggestMealPlan(req, res) {
  try {
    const suggestedMealPlan = await MealPlanService.suggestMealPlan(req.body);
    res.status(201).json(suggestedMealPlan);
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

export async function getMealsByPlanId(req, res) {
  try {
    const planId = req.params.planId;
    
    const meals = await MealPlanService.getMealsByPlanId(planId);
    
    return res.status(200).json(meals); 
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar refeições do plano." });
  }
}

