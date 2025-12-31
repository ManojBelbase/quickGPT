import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import axios from "axios";
import { cloudinary } from "../config/cloudinary";
import { generateGeminiEmbedding } from "../utils/geminiEmbedding";

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

export const ReplaceBackgroundFromImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;
        const plan: string | undefined = req.plan;
        const prompt: string = req.body.prompt.trim();

        if (plan !== "premium") {
            response(res, 403, "This feature is only available for premium users.");
            return;
        }

        if (!req.file || !req.body.prompt) {
            response(res, 400, "Both image file ('image_file') and text prompt are required.");
            return;
        }


        if (!prompt) {
            response(res, 400, "Prompt cannot be empty.");
            return;
        }
        const uploadedFile = req.file;
        // Validate file type
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
            response(res, 400, "Invalid file type. Please upload PNG, JPG, or WEBP.");
            return;
        }

        // Create FormData
        const form = new FormData();
        const imageBlob = new Blob([uploadedFile.buffer as any], { type: uploadedFile.mimetype });
        form.append('image_file', imageBlob, uploadedFile.originalname);
        form.append('prompt', prompt);

        // Call Clipdrop Replace Background API
        const apiResponse = await axios.post(
            'https://clipdrop-api.co/replace-background/v1',
            form,
            {
                headers: {
                    'x-api-key': CLIPDROP_API_KEY!,
                },
                responseType: 'arraybuffer'
            }
        );

        // Convert to base64 for Cloudinary
        const base64Image = Buffer.from(apiResponse.data).toString('base64');
        const dataUri = `data:image/jpeg;base64,${base64Image}`;

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "quickGPT/remove-object"
        });


        const embedding = await generateGeminiEmbedding(prompt);

        // Save to DB
        await sql`
            INSERT INTO creations (user_id, prompt, content, type, embedding)
            VALUES (${userId}, ${prompt}, ${`Remove ${uploadResult.secure_url} from image`}, 'remove-object', ${embedding})
        `;

        response(res, 200, "Background replaced successfully", {
            content: uploadResult.secure_url
        });

    } catch (error: any) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            response(res, 413, "File too large.");
        } else if (error.response) {
            const errorData = error.response.data instanceof Buffer
                ? error.response.data.toString()
                : error.response.data;
            response(res, error.response.status, errorData, "Image processing failed. Please try again.",);
        } else {
            response(res, 500, "Internal Server Error", error.message);
        }
    }
};


export const getReplaceBackground = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;

        const images = await sql`
            SELECT id, prompt, content, type, created_at
            FROM creations
            WHERE user_id = ${userId}
            AND type = 'remove-object'
            ORDER BY created_at DESC
        `;

        response(res, 200, "Remove-object images fetched successfully", images);

    } catch (error: any) {
        response(res, 500, "Failed to fetch image list", error.message);
    }
};