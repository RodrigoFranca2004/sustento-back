import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

export const openai = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: "2025-01-01-preview",
  deployment: "gpt-4o-ticket",
});
