import express from 'express';
import { auth } from '../middlewares/auth';
import { generateArticle, getArticles } from '../controllers/article.controller';

const articleRouter = express.Router();

articleRouter.post('/', auth, generateArticle);
articleRouter.get('/', auth, getArticles);

export default articleRouter;
