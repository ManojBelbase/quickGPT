import express from 'express';
import { auth } from '../middlewares/auth';
import { deleteBlogTitle, generateBlogTitle, getBlogTitles } from '../controllers/blogTitle.controller';

const blogTitleRouter = express.Router();

blogTitleRouter.post('/', auth, generateBlogTitle);
blogTitleRouter.get('/', auth, getBlogTitles);
blogTitleRouter.delete('/', auth, deleteBlogTitle);

export default blogTitleRouter;
