import * as AlimentService from "../services/aliment.service.js"
import * as CombinedAlimentService from "../services/combinedAliment.service.js"

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

export async function searchDbAliments(req, res) {
  try {
    const {query} = req.query
    const aliments = await AlimentService.searchDbAliments(query)
    res.json(aliments)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

export async function searchCombinedAliments(req, res) {
  try {
    // Extrai todos os parâmetros de busca de req.query
    const { query, maxResults, pageNumber } = req.query;

    const results = await CombinedAlimentService.searchCombined({ 
      query, 
      maxResults, 
      pageNumber 
    });

    res.status(200).json(results);
  } catch (err) {
    // Adicionado um log do erro no servidor para facilitar a depuração
    console.error("Error in searchCombinedAliments controller:", err);
    res.status(500).json({ error: "An internal error occurred during the search." });
  }
}

