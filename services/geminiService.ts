import { GoogleGenAI } from "@google/genai";
import { PulseData, Source, PulseItem } from "../types";

const SYSTEM_INSTRUCTION = `
You are Daily Market Pulse.
Your role: produce a JSON object with two distinct sections.

SECTION 1 key: "general"
- Provide 3 ultra-concise items on General Tech, Product Management, or Global Markets.
- Exclude Health/BioTech from this section.

SECTION 2 key: "healthAi"
- Provide 3 ultra-concise items specifically on AI in Healthcare, Biotech, or Wellness.

Rules for ALL items:
- Focus on the biggest shift in the last 24h.
- headline: Max 5 words. Punchy.
- summary: Max 12 words. Simple English.
- implication: Max 8 words. Direct takeaway.
- category: One word tag (e.g., "Markets", "Tech", "Product", "Pharma", "Clinical", "Wearables").
- url: The specific source URL where you found this information.

IMPORTANT: Output strictly as a JSON object. Do not wrap in markdown.
Schema:
{
  "general": [ { "category": "...", "headline": "...", "summary": "...", "implication": "...", "url": "..." }, ... ],
  "healthAi": [ { "category": "...", "headline": "...", "summary": "...", "implication": "...", "url": "..." }, ... ]
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
      contents: "Give me today’s Daily Market Pulse in the required JSON format.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    let jsonText = response.text || "{}";
    
    // Clean up markdown code blocks if present
    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedData: any = {};
    try {
      parsedData = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", jsonText);
      throw new Error("Failed to parse the market pulse data.");
    }

    return {
      general: parsedData.general || [],
      healthAi: parsedData.healthAi || [],
      sources: [], // No longer needed for display
    };

  } catch (error: any) {
    console.error("Error generating market pulse:", error);
    throw new Error(error.message || "Failed to generate market pulse.");
  }
};
