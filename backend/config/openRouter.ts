import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

export const openRouter = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "QuickGPT Backend",
    },
});
