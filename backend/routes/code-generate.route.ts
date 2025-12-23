import express from 'express';
import { auth } from '../middlewares/auth';
import {
    generateCode,
    getGeneratedCodes,
    deleteGeneratedCode,
} from '../controllers/codeGenerator.controller';

const codeGeneratorRouter = express.Router();
codeGeneratorRouter.post('/', auth, generateCode);
codeGeneratorRouter.get('/', auth, getGeneratedCodes);
codeGeneratorRouter.delete('/:id', auth, deleteGeneratedCode);

export default codeGeneratorRouter;