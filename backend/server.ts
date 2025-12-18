import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import articleRouter from './routes/article.route';
import blogTitleRouter from './routes/blog-title.route';
import imageRouter from './routes/image.route';
import removeBackgroundRouter from './routes/removeBg.route';
// import resumeRouter from './routes/reviewResume.route';
import ReplaceBackgroundRouter from './routes/removeObject.route';
import dashboardStatsRouter from './routes/dashboard.route';

dotenv.config();

const app = express();


// CORS Setup
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


// Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(requireAuth());

// Routes
app.use('/api/article', articleRouter);
app.use('/api/blog-title', blogTitleRouter);
app.use('/api/image', imageRouter);
app.use('/api/remove-background', removeBackgroundRouter);
app.use('/api/remove-object', ReplaceBackgroundRouter);
app.use('/api/dashboard', dashboardStatsRouter);
// app.use('/api', resumeRouter);

app.get("/", (req, res) => {
    res.send("Server is running successfully 🚀");
});

// Listen on Render dynamic port
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
