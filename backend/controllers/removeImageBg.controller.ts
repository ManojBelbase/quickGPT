// controllers/image.controller.ts
import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import axios from "axios";
import { cloudinary } from "../config/cloudinary";
import { generateGeminiEmbedding } from "../utils/geminiEmbedding";

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

export const removeImageBackground = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;
        const plan: string | undefined = req.plan;

        // Premium user check
        if (plan !== "premium") {
            response(res, 403, "This feature is only available for premium users.");
            return;
        }

        // Check if file exists (Multer puts it here)
        if (!req.file) {
            response(res, 400, "No image file uploaded.");
            return;
        }

        // Access the uploaded file from Multer
        const uploadedFile = req.file; // Contains buffer, originalname, mimetype, etc.

        // Validate file type
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedMimeTypes.includes(uploadedFile.mimetype)) {
            response(res, 400, "Invalid file type. Please upload PNG, JPG, or WEBP.");
            return;
        }

        // 1. Create FormData for Clipdrop API
        const form = new FormData();
        // Convert buffer to Blob for FormData
        const imageBlob = new Blob([uploadedFile.buffer as any], { type: uploadedFile.mimetype });
        form.append('image_file', imageBlob, uploadedFile.originalname);

        // 2. Call Clipdrop API
        const apiResponse = await axios.post(
            'https://clipdrop-api.co/remove-background/v1',
            form,
            {
                headers: {
                    'x-api-key': CLIPDROP_API_KEY!,
                },
                responseType: 'arraybuffer'
            }
        );

        // 3. Convert response for Cloudinary
        const base64Image = Buffer.from(apiResponse.data).toString('base64');
        const dataUri = `data:image/png;base64,${base64Image}`;

        // 4. Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "quickGPT/background-removed"
        });


        // 5. Save to database
        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${`Remove background from image`}, ${uploadResult.secure_url}, 'remove-image-bg')
        `;

        // 6. Send response
        response(res, 200, "Background removed successfully", {
            content: uploadResult.secure_url
        });

    } catch (error: any) {

        if (error.code === 'LIMIT_FILE_SIZE') {
            response(res, 413, "File too large. Maximum size is 30MB.");
        } else if (error.response) {
            const errorData = error.response.data instanceof Buffer
                ? error.response.data.toString()
                : error.response.data;
            response(res, error.response.status, errorData, "Clipdrop API Error");
        } else if (error.request) {
            response(res, 503, "Service Unavailable", "No response from Clipdrop API.");
        } else {
            response(res, 500, "Internal Server Error", error.message);
        }
    }
};

export const getRemovedBackgroundImages = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId: string = req.auth().userId;

        const images = await sql`
            SELECT id, content, created_at
            FROM creations
            WHERE user_id = ${userId}
              AND type = 'remove-image-bg'
            ORDER BY created_at DESC
        `;

        response(res, 200, "Success", images);
    } catch (error: any) {
        response(res, 500, "Failed to fetch images", error.message);
    }
};
