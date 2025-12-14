import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import axios from "axios";
import { cloudinary } from "../config/cloudinary";

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

export const removeObjectFromImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;
        const plan: string | undefined = req.plan;

        if (plan !== "premium") {
            response(res, 403, "This feature is only available for premium users.");
            return;
        }

        if (!req.file || !req.body.prompt) {
            response(res, 400, "Both image file ('image_file') and text prompt are required.");
            return;
        }

        const uploadedFile = req.file;
        const prompt: string = req.body.prompt.trim();

        if (!prompt) {
            response(res, 400, "Prompt cannot be empty.");
            return;
        }

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
        const dataUri = `data:image/jpeg;base64,${base64Image}`; // Usually JPEG output

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "quickGPT/background-replaced"
        });

        // Save to DB
        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image-replace-bg')
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
            response(res, error.response.status, "Clipdrop API Error", errorData);
        } else {
            response(res, 500, "Internal Server Error", error.message);
        }
    }
};