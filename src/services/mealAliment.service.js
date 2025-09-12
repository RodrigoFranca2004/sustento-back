import { prisma } from "../config/prisma.js";

export async function createMealAliment(data) {
  return await prisma.mealAliments.create({
    data: {
      ...data,
    },
  });
}

export async function listMealAliments() {
  return await prisma.mealAliments.findMany();
}

export async function getMealAliment(id) {
  return await prisma.mealAliments.findUnique({
    where: { meal_aliment_id: Number(id) },
  });
}

export async function updateMealAliment(id, data) {
  return await prisma.mealAliments.update({
    where: { meal_aliment_id: Number(id) },
    data,
  });
}

export async function deleteMealAliment(id) {
  return await prisma.mealAliments.delete({
    where: { meal_aliment_id: Number(id) },
  });
}
