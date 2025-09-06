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

async function listUsers() {
  return await userRepository.findAll();
}

async function getUser(id) {
  return await userRepository.findById(id);
}

export async function updateUser(id, data) {
  if (data.hash_password) {
    data.hash_password = await bcrypt.hash(data.hash_password, 10);
  }
  return await prisma.users.update({
    where: { user_id: Number(id) },
    data,
  });
}

async function deleteUser(id) {
  return await userRepository.remove(id);
}

module.exports = { createUser, listUsers, getUser, updateUser, deleteUser };
