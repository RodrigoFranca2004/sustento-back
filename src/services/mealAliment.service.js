import { prisma } from "../config/prisma.js";
import { createLog } from "./log.service.js";

export async function createMealAliment(data) {
  await createLog({
    message: "A MEAL ALIMENT WAS SUCCESSFULLY CREATED",
    entity_type: "MEAL ALIMENT",
    action: "CREATE"
  });

  const { alimentData, ...mealAlimentData } = data;
  const inputId = alimentData.aliment_id;

  // LÓGICA DE BUSCA INTELIGENTE ("OR")
  let existingAliment = null;

  // Limite do tipo INT no PostgreSQL/MySQL (2.147.483.647)
  const MAX_INT_SIZE = 2147483647; 
  const isSafeInt = Number(inputId) <= MAX_INT_SIZE;

  if (isSafeInt) {
    // Se for um número "pequeno", pode ser um ID interno OU um external_id curto
    existingAliment = await prisma.aliments.findFirst({
      where: {
        OR: [
          { aliment_id: Number(inputId) },
          { external_id: String(inputId) }
        ]
      }
    });
  } else {
    // Se for GIGANTE, com certeza não é ID interno (daria erro se tentasse buscar).
    // Buscamos apenas pelo external_id.
    existingAliment = await prisma.aliments.findFirst({
      where: {
        external_id: String(inputId)
      }
    });
  }

  // ID FINAL QUE SERÁ USADO NO VÍNCULO
  let finalAlimentId;

  if (existingAliment) {
    // CASO 1: Encontrou (seja por ID interno ou externo)
    finalAlimentId = existingAliment.aliment_id;
  } else {
    // CASO 2: Não encontrou -> Cria novo
    // Define o ID que veio como external_id
    alimentData.external_id = String(inputId);
    
    // Remove o ID para o banco gerar o autoincrement (ex: 598)
    delete alimentData.aliment_id;

    const newAliment = await prisma.aliments.create({
      data: {
        ...alimentData
      }
    });
    finalAlimentId = newAliment.aliment_id;
  }

  // CRIA O VÍNCULO (MealAliments)
  return await prisma.mealAliments.create({
    data: {
      ...mealAlimentData,
      aliment_id: finalAlimentId, // Usa o ID interno garantido
    },
  });
}

export async function listMealAliments() {
  return await prisma.mealAliments.findMany();
}

export async function getMealAliment(id) {
  return await prisma.mealAliments.findUnique({
    where: { meal_aliment_id: Number(id) },
  });
}

export async function updateMealAliment(id, data) {
  await createLog({
        message: "A MEAL ALIMENT WAS SUCCESSFULLY UPDATED",
        entity_id: id,
        entity_type: "MEAL ALIMENT",
        action: "UPDATE"
      });
  return await prisma.mealAliments.update({
    where: { meal_aliment_id: Number(id) },
    data,
  });
}

export async function deleteMealAliment(id) {
  await createLog({
        message: "A MEAL ALIMENT WAS SUCCESSFULLY DELETED",
        entity_id: id,
        entity_type: "MEAL ALIMENT",
        action: "DELETE"
      });
  return await prisma.mealAliments.delete({
    where: { meal_aliment_id: Number(id) },
  });
}
