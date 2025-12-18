import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import articleRouter from "./routes/article.route";
import blogTitleRouter from "./routes/blog-title.route";
import imageRouter from "./routes/image.route";
import removeBackgroundRouter from "./routes/removeBg.route";
import ReplaceBackgroundRouter from "./routes/removeObject.route";
import dashboardStatsRouter from "./routes/dashboard.route";

const app = express();

// CORS
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://quickgptai.vercel.app",
    process.env.DEV_FRONTEND_URL || "http://localhost:5173",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(clerkMiddleware());

// ✅ PUBLIC ROUTE (important)
app.get("/", (_req, res) => {
    res.send("QuickGPT Server running 🚀");
});

// 🔐 PROTECT ONLY API ROUTES
app.use("/api", requireAuth());

// Routes
app.use("/api/article", articleRouter);
app.use("/api/blog-title", blogTitleRouter);
app.use("/api/image", imageRouter);
app.use("/api/remove-background", removeBackgroundRouter);
app.use("/api/replace-background", ReplaceBackgroundRouter);
app.use("/api/dashboard", dashboardStatsRouter);

export default app; 
