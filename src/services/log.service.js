import { prisma } from "../config/prisma.js";

export async function createLog(data) {
  return await prisma.logs.create({
    data,
  });
}

export async function listLogs() {
  return await prisma.logs.findMany({
    orderBy: { created_at: 'desc' },
  });
}

export async function getLog(id) {
  return await prisma.logs.findUnique({
    where: { log_id: Number(id) },
  });
}

export async function updateLog(id, data) {
  return await prisma.logs.update({
    where: { log_id: Number(id) },
    data,
  });
}

export async function deleteLog(id) {
  return await prisma.logs.delete({
    where: { log_id: Number(id) },
  });
}