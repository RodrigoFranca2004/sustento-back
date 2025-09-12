import { prisma } from "../config/prisma.js";
import { convertTime } from "../utils/convertTime.js";

export async function createMealRecord(data) {
  const meal_moment = data.meal_moment ? convertTime(data.meal_moment) : null;
  return await prisma.mealRecords.create({
    data: {
      ...data,
      meal_moment
    },
  });
}

export async function listMealRecords() {
  return await prisma.mealRecords.findMany();
}

export async function getMealRecord(id) {
  return await prisma.mealRecords.findUnique({
    where: { record_id: Number(id) },
  });
}

export async function updateMealRecord(id, data) {
  const meal_moment = data.meal_moment ? convertTime(data.meal_moment) : undefined;
    return await prisma.mealRecords.update({
        where: { record_id: Number(id) },
        data: {
          ...data,
          ...(meal_moment && { meal_moment }),
        },
    });
}

export async function deleteMealRecord(id) {
  return await prisma.mealRecords.delete({
    where: { record_id: Number(id) },
  });
}
