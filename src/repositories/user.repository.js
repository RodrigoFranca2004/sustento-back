const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function save(userEntity) {
  return await prisma.user.create({
    data: { name: userEntity.name, email: userEntity.email },
  });
}

async function findAll() {
  return await prisma.user.findMany();
}

async function findById(id) {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
}

async function update(id, data) {
  return await prisma.user.update({ where: { id: Number(id) }, data });
}

async function remove(id) {
  return await prisma.user.delete({ where: { id: Number(id) } });
}

module.exports = { save, findAll, findById, update, remove };
