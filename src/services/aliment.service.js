import { prisma } from "../config/prisma.js";
import { createLog } from "./log.service.js";

export async function createAliment(data) {
  await createLog({
        message: "NEW ALIMENT CREATED",
        entity_type: "ALIMENT",
        action: "CREATE"
      });
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
  await createLog({
        message: "ALIMENT UPDATED",
        entity_type: "ALIMENT",
        entity_id: Number(id),
        action: "UPDATE"
      });
  return await prisma.aliments.update({
    where: { aliment_id: Number(id) },
    data,
  });
}

export async function deleteAliment(id) {
  await createLog({
        message: "ALIMENT DELETED",
        entity_type: "ALIMENT",
        entity_id: Number(id),
        action: "DELETE"
      });
  return await prisma.aliments.delete({
    where: { aliment_id: Number(id) },
  });
}

export async function searchDbAliments(query) {
  if (!query) {
    return await listAliments();
  }
  return await prisma.aliments.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
}
