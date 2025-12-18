import { Request, Response } from "express";
import sql from "../config/db";
import { response } from "../utils/responseHandler";
import { clerkClient } from "@clerk/express";

export const getDashboardStats = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.auth().userId;
        console.log(userId, "user")

        const user = await clerkClient.users.getUser(userId);
        console.log(user, "user")

        const plan = user.privateMetadata?.plan ?? "free";
        const free_usage = Number(user.privateMetadata?.free_usage ?? 0);

        const FREE_LIMIT = 10;

        // 🔹 Total creations
        const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total
      FROM creations
      WHERE user_id = ${userId}
    `;

        // 🔹 Creations grouped by type
        const creationsByType = await sql`
      SELECT type, COUNT(*)::int AS count
      FROM creations
      WHERE user_id = ${userId}
      GROUP BY type
    `;

        response(res, 200, "Dashboard data", {
            plan,
            free_usage,
            free_remaining:
                plan === "premium" ? "unlimited" : Math.max(FREE_LIMIT - free_usage, 0),
            total_creations: total,
            creations_by_type: creationsByType,
        });
    } catch (error: any) {
        console.error(error.message);
        response(res, 500, "Failed to load dashboard");
    }
};
