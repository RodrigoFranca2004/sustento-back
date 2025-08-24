const User = require("../entities/User");
const userRepository = require("../repositories/user.repository");

async function createUser(data) {
  const user = new User(data);
  return await userRepository.save(user);
}

async function listUsers() {
  return await userRepository.findAll();
}

async function getUser(id) {
  return await userRepository.findById(id);
}

async function updateUser(id, data) {
  return await userRepository.update(id, data);
}

async function deleteUser(id) {
  return await userRepository.remove(id);
}

module.exports = { createUser, listUsers, getUser, updateUser, deleteUser };
