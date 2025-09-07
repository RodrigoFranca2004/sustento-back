import { prisma } from "../config/prisma.js";

export async function createUserRestriction(data) {
  return await prisma.userRestrictions.create({
    data,
  });
}

export async function listUserRestrictions() {
  return await prisma.userRestrictions.findMany();
}

export async function getUserRestriction(user_id, restriction_id) {
  return await prisma.userRestrictions.findUnique({
    where: {
      user_id_restriction_id: {
        user_id: Number(user_id),
        restriction_id: Number(restriction_id),
      },
    },
  });
}

export async function updateUserRestriction(user_id, restriction_id, data) {
  return await prisma.userRestrictions.update({
    where: {
      user_id_restriction_id: {
        user_id: Number(user_id),
        restriction_id: Number(restriction_id),
      },
    },
    data,
  });
}

export async function deleteUserRestriction(user_id, restriction_id) {
  return await prisma.userRestrictions.delete({
    where: {
      user_id_restriction_id: {
        user_id: Number(user_id),
        restriction_id: Number(restriction_id),
      },
    },
  });
}
