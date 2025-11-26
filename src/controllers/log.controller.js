import * as LogService from "../services/log.service.js";

export async function createLog(req, res) {
  try {
    const { user_id, message  } = req.body;
    const log = await LogService.createLog({user_id, message});
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
