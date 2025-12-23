import express from 'express';
import { auth } from '../middlewares/auth';
import { deleteSocialPost, generateSocialPost, getSocialPosts } from '../controllers/socialMediaPost.controller';

const socialPostRouter = express.Router();
socialPostRouter.post('/', auth, generateSocialPost);
socialPostRouter.get('/', auth, getSocialPosts)
socialPostRouter.delete('/:id', auth, deleteSocialPost);

export default socialPostRouter;