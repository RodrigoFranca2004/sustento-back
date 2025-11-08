import { openai } from "../config/openai.js";
import * as searchOrchestrator from '../services/combinedAliment.service.js';
import { convertToGrams } from '../services/mealPlan.service.js';
import { getFoodMacros } from './combinedAliment.service.js'

async function validateMealItem(foodName, quantity, unit) {
    const macroData = await getFoodMacros(foodName);
    
    if (!macroData) return { error: "Food not found in database." };

    const itemQuantityGrams = convertToGrams(quantity.toString(), unit);
    const scale = itemQuantityGrams / 100;

    return {
        food_name: foodName,
        total_calories: (macroData.calories * scale).toFixed(2),
        total_protein: (macroData.protein * scale).toFixed(2),
        total_carbs: (macroData.carbs * scale).toFixed(2),
        total_fat: (macroData.fat * scale).toFixed(2),
    };
}


const tools = [
  {
    type: "function",
    function: {
      name: "getFoodMacroData",
      description: "Calcula os macronutrientes (proteína, gordura, carboidratos e calorias) para uma quantidade específica de um alimento. Use esta função para garantir que a sugestão de dieta se alinhe com os objetivos calóricos e de macronutrientes do usuário.",
      parameters: {
        type: "object",
        properties: {
          food_name: {
            type: "string",
            description: "O nome completo e exato do alimento conforme listado no AVAILABLE FOODS (ex: 'Aveia, flocos, crua').",
          },
          quantity: {
            type: "number",
            description: "A quantidade numérica do alimento (ex: 50, 200).",
          },
          unit: {
            type: "string",
            description: "A unidade de medida (g, kg, ml, L, ou unid).",
          },
        },
        required: ["food_name", "quantity", "unit"],
      },
    },
  },
];


export async function generateDietSuggestion(userData) {
    const { name, weight, height, objective, activity_lvl, target_calories, target_protein, target_carbs, target_fat } = userData;

    let availableFoodsString = "No specific food catalog provided."; 

    try {
        const { products } = await searchOrchestrator.searchCombined({ query: null }); 
        const foodNamesArray = products.map(p => p.name || `${p.brand} product`);
        
        if (foodNamesArray.length > 0) {
            availableFoodsString = foodNamesArray.join(', ');
        }
        
        if (foodNamesArray.length === 0) {
             console.warn("Catalog search returned an empty list. AI will use generic foods.");
        }
        
    } catch (e) {
        console.error("Failed to retrieve available food list from combined service:", e.message);
    }

    const systemContent = `
      You are a professional nutritionist and a highly structured JSON generator. Your task is to output a perfect JSON object following the provided structure and rules.

      **INSTRUCTION:** You MUST use the 'getFoodMacroData' tool to calculate the nutritional totals of the planned meals and verify that they meet the user's goals before finalizing the JSON response. The target caloric intake for this plan is **${target_calories} kcal**, with target macros: Protein (${target_protein}g), Carbs (${target_carbs}g), Fat (${target_fat}g). Your suggested total MUST be within 5% of the target values, especially for Calories and Protein.

      **STRICT OUTPUT PROTOCOL:**
      1.  **Structure:** The output MUST contain four keys ('breakfast', 'lunch', 'dinner', 'snacks'). Each of these keys MUST contain an **OBJECT**.
      2.  **Item Keys:** The nested object (e.g., 'breakfast') MUST use sequential keys starting from 'item1' (e.g., 'item1', 'item2', 'item3', etc.).
      3.  **Item Value (CRITICAL CHANGE):** The value of each 'itemN' key MUST be an object with exactly three keys: **"name"** (string), **"quantity"** (number), and **"measurement_unit"** (string).
      4.  **Unit Format (CRITICAL):** The "measurement_unit" value MUST be ONLY one of the following: **g, kg, ml, L, or un** (for unit/slice/piece). The "quantity" MUST be a numerical value.
          * **Example of Conversion:** "2 slices" MUST be converted to {"quantity": 2, "measurement_unit": "un"}.
      5.  **Food Source:** You MUST only use ingredients and meals listed in the 'AVAILABLE FOODS' section.
      6.  **Total Calories:** You MUST NOT include the "totalCalories" key.

      The required JSON format is:
      {
        "breakfast": {
          "item1": { "name": "Food 1 Name", "quantity": 100, "measurement_unit": "g" },
          "item2": { "name": "Food 2 Name", "quantity": 200, "measurement_unit": "ml" }
        },
        "lunch": { ... },
        "dinner": { ... },
        "snacks": { ... }
      }
    `;

    const prompt = `
      You are a professional nutritionist.
      Generate a personalized diet suggestion for:
      - Name: ${name}
      - Weight: ${weight} kg
      - Height: ${height} cm
      - Goal: ${objective}
      - Activity level: ${activity_lvl}

      AVAILABLE FOODS:
      [${availableFoodsString}] 

      **IMMEDIATE ACTION REQUIRED:** You MUST strictly adhere to the **STRICT OUTPUT PROTOCOL** defined in the system message. Use the 'getFoodMacroData' tool for calculation validation.

      Output a structured JSON with:
      {
        "breakfast": { "item1": { ... }, ... },
        "lunch": { ... },
        "dinner": { ... },
        "snacks": { ... },
      }
      Return to me just the JSON, without any other info or it will break my code. Use the specified **JSON** format.
    `;

  try {
    let messages = [
        { role: "system", content: systemContent },
        { role: "user", content: prompt },
    ];

    for (let i = 0; i < 5; i++) {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo", 
            messages: messages,
            tools: tools,
            tool_choice: "auto",
            temperature: 0.2, 
            max_tokens: 2048,
            response_format: { type: "json_object" },
        });

        const responseMessage = completion.choices[0].message;

        if (responseMessage.tool_calls) {
            const toolCalls = responseMessage.tool_calls;
            messages.push(responseMessage);

            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                if (functionName === "getFoodMacroData") {
                    const result = await validateMealItem(
                        functionArgs.food_name, 
                        functionArgs.quantity, 
                        functionArgs.unit
                    );
                    
                    messages.push({
                        tool_call_id: toolCall.id,
                        role: "tool",
                        content: JSON.stringify(result),
                    });
                }
            }
        } else {
            const content = responseMessage.content;
            return JSON.parse(content);
        }
    }
    
    throw new Error("AI failed to generate final response after maximum tool calls.");

  } catch (error) {
      console.error("Error in OpenAI API call:", error);
      throw error;
  }
}