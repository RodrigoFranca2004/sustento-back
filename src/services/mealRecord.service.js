import { prisma } from "../config/prisma.js";

export async function createMealRecord(data) {
  return await prisma.mealRecords.create({
    data: {
      ...data,
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
    return await prisma.mealRecords.update({
        where: { record_id: Number(id) },
        data,
    });
}

export async function deleteMealRecord(id) {
  return await prisma.mealRecords.delete({
    where: { record_id: Number(id) },
  });
}
