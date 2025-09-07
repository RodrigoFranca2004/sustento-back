import * as RestrictionService from "../services/restriction.service.js"

export async function createRestriction(req, res) {
  try {
    const restriction = await RestrictionService.createRestriction(req.body);
    res.status(201).json(restriction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listRestrictions(req, res) {
  const restrictions = await RestrictionService.listRestrictions();
  res.json(restrictions);
}

export async function getRestriction(req, res) {
  const restriction = await RestrictionService.getRestriction(req.params.id);
  if (!restriction) return res.status(404).json({ error: "restriction not found" });
  res.json(restriction);
}

export async function updateRestriction(req, res) {
  try {
    const restriction = await RestrictionService.updateRestriction(req.params.id, req.body);
    res.json(restriction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteRestriction(req, res) {
  try {
    await RestrictionService.deleteRestriction(req.params.id);
    res.status(204).send()
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

