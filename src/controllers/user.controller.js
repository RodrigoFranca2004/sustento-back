import * as UserService from "../services/user.service.js"

export async function listUsers(req, res) {
  const users = await UserService.listUsers();
  res.json(users);
}

export async function getUser(req, res) {
  const user = await UserService.getUser(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function updateUser(req, res) {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listMyEvolution(req, res) {
  try {
    const id = req.params.id
    const {start, end} = req.body || {}
    const evolutions = await UserService.listMyEvolution({id, start, end});
    res.json(evolutions)
  } catch (err) {
    res.status(400).json({err: err.message});
  }
}

