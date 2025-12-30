import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import axios from "axios";
import { cloudinary } from "../config/cloudinary";
import dotenv from 'dotenv';
import { generateGeminiEmbedding } from "../utils/geminiEmbedding";
dotenv.config();

const CLIPDROP_API_KEY = process.env.CLIPDROP_API_KEY;

export const generateImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;
        const { prompt, publish } = req.body;
        const plan: string | undefined = req.plan;

        // Premium user check
        if (plan !== "premium") {
            response(res, 403, "This feature is only available for premium users.");
            return;
        }
        // 1. Create FormData exactly like the documentation
        const form = new FormData();
        form.append('prompt', prompt);

        // 2. Use axios.post with the correct configuration
        const apiResponse = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            form,
            {
                headers: {
                    'x-api-key': CLIPDROP_API_KEY!,
                },
                responseType: 'arraybuffer'
            }
        );

        // 3. Convert the ArrayBuffer to a Base64 Data URI for Cloudinary
        const base64Image = Buffer.from(apiResponse.data).toString('base64');
        const dataUri = `data:image/png;base64,${base64Image}`;

        // 4. Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "quickGPT/generated_images"
        });

        const embedding = await generateGeminiEmbedding(prompt);


        // 5. Save record to your database
        await sql`
            INSERT INTO creations (user_id, prompt, content, type, publish, embedding)
            VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${publish ?? false}, ${embedding})
        `;

        // 6. Send success response
        response(res, 200, "Success", { content: uploadResult.secure_url });

    } catch (error: any) {

        // Provide more specific error messages
        if (error.response) {
            // Clipdrop API returned an error status (4xx, 5xx)
            const errorData = error.response.data instanceof Buffer
                ? error.response.data.toString()
                : error.response.data;

            response(res, error.response.status, "Clipdrop API Error", errorData);
        } else if (error.request) {
            // Request was made but no response received
            response(res, 503, "Service Unavailable", "No response received from Clipdrop API.");
        } else {
            // Something else went wrong
            response(res, 500, "Internal Server Error", error.message);
        }
    }
};


export const getUserImages = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: string = req.auth().userId;

        const images = await sql`
            SELECT id, prompt, content, publish, created_at
            FROM creations
            WHERE user_id = ${userId} AND type = 'image'
            ORDER BY created_at DESC
        `;

        response(res, 200, "Success", images);
    } catch (error: any) {
        console.error(error);
        response(res, 500, "Something went wrong", error.message);
    }
};

export const getPublishImages = async (req: Request, res: Response): Promise<void> => {
    try {

        const publishedImages = await sql`SELECT * FROM creations WHERE type = 'image' AND publish = true ORDER BY created_at DESC`

        response(res, 200, "Publish Images fetched successfully", publishedImages);

    } catch (error) {
        response(res, 500, "Failed to feath published images");

    }
}

export const toggleLikeImages = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.auth().userId;
        const { id } = req.body;

        if (!id) {
            response(res, 400, "Image id is required");
            return;
        }

        const [image] = await sql`
      SELECT likes
      FROM creations
      WHERE id = ${id} AND type = 'image'
    `;

        if (!image) {
            response(res, 404, "Image not found");
            return;
        }

        const currentLikes: string[] = image.likes ?? [];
        const userIdStr = String(userId);

        let updatedLikes: string[];
        let message: string;

        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter(uid => uid !== userIdStr);
            message = "Unliked";
        } else {
            updatedLikes = [...currentLikes, userIdStr];
            message = "Liked";
        }

        await sql`UPDATE creations SET likes = ${updatedLikes} WHERE id = ${id}`;

        response(res, 200, message, { likes: updatedLikes, likesCount: updatedLikes.length });

    } catch (error: any) {
        console.error(error.message);
        response(res, 500, "Failed to toggle like");
    }
};
