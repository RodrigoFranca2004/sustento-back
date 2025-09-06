import { prisma } from "../config/prisma.js";

import bcrypt from "bcrypt";

export async function createUser(data) {
  const hashed = await bcrypt.hash(data.hash_password, 10);
  return await prisma.users.create({
    data: {
      ...data,
      hash_password: hashed,
    },
  });
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
  if (data.hash_password) {
    data.hash_password = await bcrypt.hash(data.hash_password, 10);
  }
}

export async function deleteUser(id) {
  return await prisma.users.delete({
    where: { user_id: Number(id) },
  });
}
