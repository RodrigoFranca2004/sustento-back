import { prisma } from "../config/prisma.js";
import { createLog } from "./log.service.js";

export async function createMealAliment(data) {
  await createLog({
        message: "A MEAL ALIMENT WAS SUCCESSFULLY CREATED",
        entity_type: "MEAL ALIMENT",
        action: "CREATE"
      });
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
  await createLog({
        message: "A MEAL ALIMENT WAS SUCCESSFULLY UPDATED",
        entity_id: id,
        entity_type: "MEAL ALIMENT",
        action: "UPDATE"
      });
  return await prisma.mealAliments.update({
    where: { meal_aliment_id: Number(id) },
    data,
  });
}

export async function deleteMealAliment(id) {
  await createLog({
        message: "A MEAL ALIMENT WAS SUCCESSFULLY DELETED",
        entity_id: id,
        entity_type: "MEAL ALIMENT",
        action: "DELETE"
      });
  return await prisma.mealAliments.delete({
    where: { meal_aliment_id: Number(id) },
  });
}
