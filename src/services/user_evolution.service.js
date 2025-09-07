import { prisma } from "../config/prisma.js";

export async function createUserEvolution(data) {
  return await prisma.userEvolutions.create({
    data: {
      ...data,
    },
  });
}

export async function listUserEvolutions() {
  return await prisma.userEvolutions.findMany();
}

export async function getUserEvolution(id) {
  return await prisma.userEvolutions.findUnique({
    where: { evolution_id: Number(id) },
  });
}

export async function updateUserEvolution(id, data) {
    return await prisma.userEvolutions.update({
        where: { evolution_id: Number(id) },
        data,
    });
}

export async function deleteUserEvolution(id) {
  return await prisma.userEvolutions.delete({
    where: { evolution_id: Number(id) },
  });
}
