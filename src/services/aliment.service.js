import { prisma } from "../config/prisma.js";

export async function createAliment(data) {
  return await prisma.aliments.create({
    data: {
      ...data,
    },
  });
}

export async function listAliments() {
  return await prisma.aliments.findMany();
}

export async function getAliment(id) {
  return await prisma.aliments.findUnique({
    where: { aliment_id: Number(id) },
  });
}

export async function updateAliment(id, data) {
  return await prisma.aliments.update({
    where: { aliment_id: Number(id) },
    data,
  });
}

export async function deleteAliment(id) {
  return await prisma.aliments.delete({
    where: { aliment_id: Number(id) },
  });
}
