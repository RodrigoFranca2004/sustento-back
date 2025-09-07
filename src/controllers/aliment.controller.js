import * as AlimentService from "../services/aliment.service.js"

export async function createAliment(req, res) {
  try {
    const aliment = await AlimentService.createAliment(req.body);
    res.status(201).json(aliment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listAliments(req, res) {
  const aliment = await AlimentService.listAliments();
  res.json(aliment);
}

export async function getAliment(req, res) {
  const aliment = await AlimentService.getAliment(req.params.id);
  if (!aliment) return res.status(404).json({ error: "Aliment not found" });
  res.json(aliment);
}

export async function updateAliment(req, res) {
  try {
    const aliment = await AlimentService.updateAliment(req.params.id, req.body);
    res.json(aliment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAliment(req, res) {
  try {
    await AlimentService.deleteAliment(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

