// utils/geminiEmbedding.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export async function generateGeminiEmbedding(text: string): Promise<number[] | null> {
    try {
        // Limit text length for safety (optional)
        const safeText = text.slice(0, 3000);

        const response = await ai.models.embedContent({
            model: "gemini-embedding-001",
            contents: safeText,
        });

        // Gemini embedding is in embeddings[0].values
        const embedding = response?.embeddings?.[0]?.values;

        if (!embedding) {
            console.warn("No embedding returned, returning null");
            return null;
        }

        return embedding;
    } catch (error) {
        console.error("Gemini embedding error:", error);
        return null; // fail-safe: don't crash if embedding fails
    }
}
