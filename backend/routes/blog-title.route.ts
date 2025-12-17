import express from 'express';
import { auth } from '../middlewares/auth';
import { generateBlogTitle } from '../controllers/blogTitle.controller';

const blogTitleRouter = express.Router();

blogTitleRouter.post('/', auth, generateBlogTitle);

export default blogTitleRouter;
