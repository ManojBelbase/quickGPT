import express from 'express';
import { auth } from '../middlewares/auth';
import { generateImage, getPublishImages, getUserImages, toggleLikeImages } from '../controllers/image.controller';

const imageRouter = express.Router();

imageRouter.post('/', auth, generateImage);
imageRouter.get('/', auth, getUserImages);
imageRouter.get('/published', auth, getPublishImages);
imageRouter.post('/toggle-like', auth, toggleLikeImages)

export default imageRouter;
