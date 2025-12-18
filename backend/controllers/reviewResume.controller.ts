// import { Request, Response } from "express";
// import fs from 'fs'
// import sql from "../config/db";
// import { response } from "../utils/responseHandler";
// // const pdf = require("pdf-parse");

// import { openRouter } from "../config/openRouter";

// export const reviewResume = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const userId: string = req.auth().userId;
//         const resume = req.file
//         const plan: string | undefined = req.plan;

//         // Free users limit
//         if (plan !== "premium") {
//             response(res, 403, "This plan is only avaliable for premium user.");
//             return;
//         }

//         if (resume?.size as any > 5 * 1024 * 1024) {
//             response(res, 400, "Resume file size exceeds allowed file size (5MB).");

//         }

//         const dataBuffer = fs.readFileSync(resume?.path as any)
//         // const pdfData = await pdf(dataBuffer)

//         const prompt = `Review the following resume and provide constructive feedback on its strength, weakness, and areas of improvement.\n\n${pdfData.text}`

//         const aiResponse = await openRouter.post("/chat/completions", {
//             model: "tngtech/deepseek-r1t-chimera:free",
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0.7,
//             max_tokens: 1000,
//         });
//         const content: string =
//             aiResponse.data.choices?.[0]?.message?.content ?? "";

//         await sql`
//             INSERT INTO creations (user_id, prompt, content, type)
//             VALUES (${userId}, ${prompt}, ${content}, 'resume-review')
//         `;

//         response(res, 200, content)


//     } catch (error: any) {
//         console.error(error.response?.data || error.message);
//         response(res, 500, "Something went wrong", error.response?.data ?? error.message);
//     }
// };