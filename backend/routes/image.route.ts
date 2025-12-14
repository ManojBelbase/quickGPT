import express from 'express';
import { auth } from '../middlewares/auth';
import { generateImage } from '../controllers/image.controller';

const imageRouter = express.Router();

imageRouter.post('/generate-image', auth, generateImage);

export default imageRouter;
