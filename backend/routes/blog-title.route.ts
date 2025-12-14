import express from 'express';
import { auth } from '../middlewares/auth';
import { generateBlogTitle } from '../controllers/blogTitle.controller';

const blogTitleRouter = express.Router();

blogTitleRouter.post('/generate-blog-title', auth, generateBlogTitle);

export default blogTitleRouter;
