import express from 'express';
import { auth } from '../middlewares/auth';
import { deleteArticle, generateArticle, getArticles } from '../controllers/article.controller';

const articleRouter = express.Router();

articleRouter.post('/', auth, generateArticle);
articleRouter.get('/', auth, getArticles);
articleRouter.delete('/:id', auth, deleteArticle);

export default articleRouter;
