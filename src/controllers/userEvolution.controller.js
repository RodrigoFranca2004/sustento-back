import * as UserEvolutionService from "../services/user_evolution.service.js"

export async function createUserEvolution(req, res) {
  try {
    const user_evolution = await UserEvolutionService.createUserEvolution(req.body);
    res.status(201).json(user_evolution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listUserEvolutions(req, res) {
  const user_evolution = await UserEvolutionService.listUserEvolutions();
  res.json(user_evolution);
}

export async function getUserEvolution(req, res) {
  const user_evolution = await UserEvolutionService.getUserEvolution(req.params.id);
  if (!user_evolution) return res.status(404).json({ error: "user evolution not found" });
  res.json(user_evolution);
}

export async function updateUserEvolution(req, res) {
  try {
    const user_evolution = await UserEvolutionService.updateUserEvolution(req.params.id, req.body);
    res.json(user_evolution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUserEvolution(req, res) {
  try {
    await UserEvolutionService.deleteUserEvolution(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

