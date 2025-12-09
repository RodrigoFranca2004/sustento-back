import { prisma } from "../config/prisma.js";
import { createLog } from "./log.service.js";

export async function createRestriction(data) {
  await createLog({
      message: "ALLOWED RESTRICTION CREATED",
      entity_type: "RESTRICTION",
      action: "CREATE"
    });
  return await prisma.restrictions.create({
    data: {
      ...data,
    },
  });
}

export async function listRestrictions() {
  return await prisma.restrictions.findMany();
}

export async function getRestriction(id) {
  return await prisma.restrictions.findUnique({
    where: { restriction_id: Number(id) },
  });
}

export async function updateRestriction(id, data) {
    await createLog({
      message: "ALLOWED RESTRICTIONS UPDATED",
      entity_type: "RESTRICTION",
      entity_id: Number(id),
      action: "UPDATE"
    });
    return await prisma.restrictions.update({
        where: { restriction_id: Number(id) },
        data,
    });
}

export async function deleteRestriction(id) {
  await createLog({
      message: "ALLOWED RESTRICTION DELETED",
      entity_type: "RESTRICTION",
      entity_id: Number(id),
      action: "DELETE"
    });
  return await prisma.restrictions.delete({
    where: { restriction_id: Number(id) },
  });
}
