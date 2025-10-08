import { prisma } from "../config/prisma.js";
import { convertHoursToDatetime } from "../utils/convertHoursToDatetime.js";


export async function createMeal(data) {
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
  return await prisma.meals.delete({
    where: { meal_id: Number(id) },
  });
}
