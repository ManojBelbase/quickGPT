import express from 'express';
import { generateChatResponse } from '../controllers/chat.controller';
import { chatRateLimiter } from '../config/chatRateLimiter';
const chatRouter = express.Router();

chatRouter.post('/', chatRateLimiter, generateChatResponse);

export default chatRouter;