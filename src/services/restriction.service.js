import { prisma } from "../config/prisma.js";

export async function createRestriction(data) {
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
    return await prisma.restrictions.update({
        where: { restriction_id: Number(id) },
        data,
    });
}

export async function deleteRestriction(id) {
  return await prisma.restrictions.delete({
    where: { restriction_id: Number(id) },
  });
}
