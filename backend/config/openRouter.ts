import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_API_KEY_FOR_CHATBOT = process.env.OPENROUTER_API_KEY_FOR_CHATBOT

export const openRouter = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "QuickGPT Backend",
    },
});





export const openRouterForChatBot = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY_FOR_CHATBOT}`,
        "Content-Type": "application/json",
        "X-Title": "QuickGPT ChatBot",
    },
});
