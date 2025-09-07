import { prisma } from "../config/prisma.js";

export async function createMealPlan(data) {
  return await prisma.mealPlans.create({
    data: {
      ...data,
    },
  });
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
