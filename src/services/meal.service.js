import { prisma } from "../config/prisma.js";
import { convertHoursToDatetime } from "../utils/convertHoursToDatetime.js";
import { createLog } from "./log.service.js";

export async function createMeal(data) {
  await createLog({
        message: "A MEAL WAS SUCCESSFULLY CREATED",
        action: "CREATE"
      });
  const time = data.time ? convertHoursToDatetime(data.time) : null;
  return await prisma.meals.create({
    data: {
      ...data,
      time,
    },
  });
}

export async function listMeals() {
  return await prisma.meals.findMany();
}

export async function getMeal(id) {
  return await prisma.meals.findUnique({
    where: { meal_id: Number(id) },
  });
}

export async function updateMeal(id, data) {
  await createLog({
        message: "A MEAL WAS SUCCESSFULLY UPDATED",
        entity_id: data.meal_id,
        entity_type: "MEAL",
        action: "UPDATE"
      });
  const time = data.time ? convertHoursToDatetime(data.time) : undefined;
  return await prisma.meals.update({
    where: { meal_id: Number(id) },
    data: {
      ...data,
      ...(time && { time }),
    },
  });
}

export async function deleteMeal(id) {
  await createLog({
        message: "A MEAL WAS SUCCESSFULLY DELETED",
        entity_id: id,
        entity_type: "MEAL",
        action: "DELETE"
      });
  return await prisma.meals.delete({
    where: { meal_id: Number(id) },
  });
}

export async function getMealAliments(meal_id) {
  return await prisma.meals.findUnique({
    where: { meal_id: Number(meal_id) },
    select: {
      meal_id: true,
      meal_name: true,
      time: true,
      MealAliments: {
        select: {
          quantity: true,
          measurement_unit: true,
          aliment: {
            select: {
              aliment_id: true,
              name: true,
              brand: true,
              calories_100g: true,
              protein_100g: true,
              carbs_100g: true,
              fat_100g: true,
            },
          },
        },
      },
    },
  });
}
