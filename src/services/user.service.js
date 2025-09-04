import { prisma } from "../config/prisma.js";

export async function createUser(data) {
  return await prisma.users.create({ data });
}

export async function listUsers() {
  return await prisma.users.findMany();
}

export async function getUser(id) {
  return await prisma.users.findUnique({
    where: { user_id: Number(id) },
  });
}

export async function updateUser(id, data) {
  return await prisma.users.update({
    where: { user_id: Number(id) },
    data,
  });
}

export async function deleteUser(id) {
  return await prisma.users.delete({
    where: { user_id: Number(id) },
  });
}
