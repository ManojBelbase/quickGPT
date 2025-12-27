import sql from "../config/db";
import { generateGeminiEmbedding } from "./geminiEmbedding";

export async function generateEmbeddingInBackground(creationId: number, content: string) {
    setTimeout(async () => {
        try {
            const embedding = await generateGeminiEmbedding(content);

            if (!embedding) return;

            const cleanedEmbedding = embedding.map(Number);

            console.log("Embedding length:", cleanedEmbedding.length);

            await sql`
                UPDATE creations
                SET embedding = ${JSON.stringify(cleanedEmbedding)}
                WHERE id = ${creationId}
            `;

            console.log("Embedding saved for creation:", creationId);

        } catch (err) {
            console.error("Background embedding failed:", err);
        }
    }, 100); // run immediately but non-blocking
}
