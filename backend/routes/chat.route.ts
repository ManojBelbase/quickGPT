import express from 'express';
import { generateChatResponse, getChatHistory } from '../controllers/chat.controller';
const chatRouter = express.Router();

chatRouter.post('/', generateChatResponse);
chatRouter.get('/', getChatHistory);

export default chatRouter;