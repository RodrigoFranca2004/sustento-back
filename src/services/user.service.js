import { prisma } from "../config/prisma.js";

import bcrypt from "bcrypt";

const SELECT_USER_WITHOUT_PASSWORD = {
  "user_id": true,
  "name": true,
  "email": true,
  "age": true,
  "gender": true,
  "weight": true,
  "height": true,
  "objective": true,
  "activity_lvl": true,
  "active_plan_id": true,
  "created_at": true,
  "updated_at": true
}


export async function listUsers() {
  return await prisma.users.findMany({
    select: SELECT_USER_WITHOUT_PASSWORD
  });
}

export async function getUser(id) {
  return await prisma.users.findUnique({
    where: { user_id: Number(id) },
    select: SELECT_USER_WITHOUT_PASSWORD
  });
}

export async function updateUser(id, data) {
  if (data.hash_password) {
    data.hash_password = await bcrypt.hash(data.hash_password, 10);
  }
  return await prisma.users.update({
    where: { user_id: Number(id) },
    data,
    select: SELECT_USER_WITHOUT_PASSWORD
  });
}

export async function deleteUser(id) {
  return await prisma.users.delete({
    where: { user_id: Number(id) },
  });
}
