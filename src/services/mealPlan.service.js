import { prisma } from "../config/prisma.js";

export async function createMealPlan(data) {
  let mealPlan = await prisma.mealPlans.create({
    data: {
      ...data,
    },
  });

  const { target_calories, target_protein, target_fat, target_carbs } =
    await calculateNutrients(mealPlan.plan_id);

  mealPlan = await updateMealPlan(mealPlan.plan_id, {
    target_calories,
    target_protein,
    target_fat,
    target_carbs,
  });

  return mealPlan;
}

export async function listMealPlans() {
  return await prisma.mealPlans.findMany();
}

export async function getMealPlan(id) {
  return await prisma.mealPlans.findUnique({
    where: { plan_id: Number(id) },
  });
}

export async function updateMealPlan(id, data) {
  return await prisma.mealPlans.update({
    where: { plan_id: Number(id) },
    data,
  });
}

export async function deleteMealPlan(id) {
  return await prisma.mealPlans.delete({
    where: { plan_id: Number(id) },
  });
}

async function calculateNutrients(mealPlanId) {
  const mealPlanRow = await getMealPlan(mealPlanId);
  const user_id = mealPlanRow.user_id;
  const userRow = await prisma.users.findUnique({
    where: { user_id: Number(user_id) },
    select: {
      gender: true,
      height: true,
      weight: true,
      age: true,
      activity_lvl: true,
    },
  });

  const { gender, height, weight, age, activity_lvl } = userRow;

  if (!gender || !height || !weight || !age || !activity_lvl) {
    throw new Error("The user has not all required info");
  }

  const baseFormula = 10 * weight + 6.25 * height - 5 * age;

  let target_calories = 0;
  switch (gender) {
    case "M":
      target_calories = baseFormula + 5;
      break;
    case "F":
      target_calories = baseFormula - 161;
      break;
    default:
      throw new Error("Gender not informed");
  }

  switch (activity_lvl) {
    case "SEDENTARY":
      target_calories *= 1.2;
      break;
    case "LIGHTLY_ACTIVE":
      target_calories *= 1.375;
      break;
    case "MODERATELY_ACTIVE":
      target_calories *= 1.55;
      break;
    case "ACTIVE":
      target_calories *= 1.725;
      break;
    case "VERY_ACTIVE":
      target_calories *= 1.9;
      break;
    default:
      throw new Error("Activity Level not informed");
  }

  target_calories = Math.floor(target_calories)

  let target_protein = Math.floor((target_calories * 0.2) / 4);
  let target_fat = Math.floor((target_calories * 0.3) / 9);
  let target_carbs = Math.floor((target_calories * 0.5) / 4);

  // Guarantees consistence between calories and nutrients subtracting the difference from carbs (worts scenario its 17kcal)
  let total_calc = target_protein*4 + target_fat*9 + target_carbs*4;
  let diff = Math.round(target_calories - total_calc)

  target_carbs += diff

  const target_nutrients = {
    target_calories,
    target_protein,
    target_fat,
    target_carbs,
  };

  return target_nutrients;
}
