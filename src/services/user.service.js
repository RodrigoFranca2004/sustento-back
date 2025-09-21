import { prisma } from "../config/prisma.js";

import bcrypt from "bcrypt";

const SELECT_USER_WITHOUT_PASSWORD = {
  "user_id": true,
  "name": true,
  "email": true,
  "age": true,
  "gender": true,
  "bmi": true,
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

  if (data.weight || data.height) {
    const { bmi, bmi_category } = await calculateBmi(id,data.weight,data.height,)
    data.bmi = bmi
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

async function calculateBmi(id, paramWeight, paramHeight) {
  const hasParams = Boolean(paramHeight && paramWeight);

  let user = {};

  if (!hasParams) {
    user = await prisma.users.findUnique({
      where: { user_id: Number(id) },
      select: { weight: true, height: true }
    });

    if (!user) {
      return null;
    }

    if (!user.weight || !user.height) {
      throw new Error("User is missing weight/height");
    }
  }

  let weight = paramWeight ?? user.weight;
  let height = paramHeight ?? user.height;

  weight = Number(weight);
  height = Number(height);

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let bmi_category = "";

  if (bmi < 18.5) {
    bmi_category = "Underweight";
  } else if (bmi < 25) {
    bmi_category = "Normal weight";
  } else if (bmi < 30) {
    bmi_category = "Overweight";
  } else {
    bmi_category = "Obesity";
  }

  return {
    bmi: Number(bmi.toFixed(2)),
    bmi_category
  };
}

