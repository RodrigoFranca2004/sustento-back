import { openai } from "../config/openai.js";

export async function generateDietSuggestion(userData) {
  const { name, weight, height, objective, activity_lvl } = userData;

  const prompt = `
You are a professional nutritionist.
Generate a personalized diet suggestion for:
- Name: ${name}
- Weight: ${weight} kg
- Height: ${height} cm
- Goal: ${objective}
- Activity level: ${activity_lvl}

Output a structured JSON with:
{
  "breakfast": "...",
  "lunch": "...",
  "dinner": "...",
  "snacks": "...",
  "totalCalories": ...
}
  Return to me just the JSON, without any other info or it will brake my code
  `;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a professional nutrition assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 800,
  });

  const content = completion.choices[0].message.content;
  return JSON.parse(JSON.stringify(content));
}
