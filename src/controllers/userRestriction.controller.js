import * as UserRestrictionService from "../services/userRestriction.service.js";

export async function createUserRestriction(req, res) {
  try {
    const user_restriction = await UserRestrictionService.createUserRestriction(req.body);
    res.status(201).json(user_restriction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listUserRestrictions(req, res) {
  try {
    const user_restriction = await UserRestrictionService.listUserRestrictions();
    res.json(user_restriction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserRestriction(req, res) {
  try {
    const { user_id, restriction_id } = req.query;
    const user_restriction = await UserRestrictionService.getUserRestriction(user_id, restriction_id);
    if (!user_restriction) {
      return res.status(404).json({ error: "user restriction not found" });
    }
    res.json(user_restriction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateUserRestriction(req, res) {
  try {
    const { user_id, restriction_id } = req.query;
    const data = req.body;
    const user_restriction = await UserRestrictionService.updateUserRestriction(user_id, restriction_id, data);
    res.json(user_restriction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUserRestriction(req, res) {
  try {
    const { user_id, restriction_id } = req.query;
    await UserRestrictionService.deleteUserRestriction(user_id, restriction_id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
