import express from 'express';
import { auth } from '../middlewares/auth';
import { generateArticle } from '../controllers/article.controller';

const articleRouter = express.Router();

articleRouter.post(
    '/generate-article',
    auth,
    generateArticle
);

export default articleRouter;
