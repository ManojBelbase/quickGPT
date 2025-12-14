
import { clerkClient } from "@clerk/express";
import { response } from "../utils/responseHandler";
import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { userId, has } = await req.auth()
        const hasPremiumPlan = await has({ plan: "premium" })

        const user = await clerkClient.users.getUser(userId);

        if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
            req.free_usage = user.privateMetadata.free_usage as number;
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: 0 }
            });
            req.free_usage = 0;
        }

        req.plan = hasPremiumPlan ? "premium" : "free";
        next();
    } catch (error: any) {
        response(res, 401, error?.message || "Authentication failed");
    }
};
