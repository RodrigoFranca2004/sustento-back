import * as LogService from "../services/log.service.js";

export async function createLog(req, res) {
  try {
    const log = await LogService.createLog(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function listLogs(req, res) {
  try {
    const logs = await LogService.listLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getLog(req, res) {
  try {
    const logId = req.params.id;
    const log = await LogService.getLog(logId);
    if (!log) {
      return res.status(404).json({ error: "Log not found" });
    }
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateLog(req, res) {
  try {
    const logId = req.params.id;
    const data = req.body;
    const log = await LogService.updateLog(logId, data);
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteLog(req, res) {
  try {
    const logId = req.params.id;
    await LogService.deleteLog(logId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}