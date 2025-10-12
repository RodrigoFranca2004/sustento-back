// scripts/clearAliments.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clearAlimentsTable() {
  console.log("Iniciando a limpeza da tabela de Alimentos...");
  try {
    // O deleteMany com um objeto vazio deleta todos os registros
    const { count } = await prisma.aliments.deleteMany({});
    console.log(`✅ Sucesso! ${count} registros foram deletados da tabela Aliments.`);
  } catch (error) {
    console.error("❌ Ocorreu um erro ao limpar a tabela:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearAlimentsTable();