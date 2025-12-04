import { GoogleGenAI } from "@google/genai";
import { PulseData, Source, PulseItem } from "../types";

const SYSTEM_INSTRUCTION = `
You are Daily Market Pulse: an ultra-concise trend summariser.
Your role: produce a short, analytical briefing across four areas:
1. AI
2. Product Management
3. Digital Health / Wellness
4. Tech markets

Rules:
- UK spelling
- Focus on what shifted in the last 24 hours
- Include 1–2 implications for someone working in product or AI strategy
- VISUAL PROMPT: Provide a short, artistic, description of the news topic (e.g. "glowing neural network nodes cyan", "digital stock chart rising orange") for an image generator.

IMPORTANT: Output strictly as a JSON array. Do not wrap the JSON in markdown code blocks.
The schema for each item in the array is:
{
  "category": "string",
  "headline": "string",
  "summary": "string",
  "implication": "string",
  "visualPrompt": "string"
}
`;

export const generateMarketPulse = async (): Promise<PulseData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not defined");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Give me today’s Daily Market Pulse as a raw JSON array.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are not compatible with googleSearch tools, so we rely on text instructions.
      },
    });

    let jsonText = response.text || "[]";
    
    // Clean up markdown code blocks if present (e.g. ```json ... ```)
    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

    let items: PulseItem[] = [];
    try {
      items = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", jsonText);
      throw new Error("Failed to parse the market pulse data from the AI response.");
    }
    
    // Extract sources from grounding chunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = [];

    groundingChunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        sources.push({
          title: chunk.web.title,
          uri: chunk.web.uri,
        });
      }
    });

    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i);

    return {
      items,
      sources: uniqueSources,
    };

  } catch (error: any) {
    console.error("Error generating market pulse:", error);
    throw new Error(error.message || "Failed to generate market pulse.");
  }
};
