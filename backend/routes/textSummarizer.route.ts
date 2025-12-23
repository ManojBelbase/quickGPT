import express from 'express';
import { auth } from '../middlewares/auth';
import { deleteSummary, generateSummary, getSummaries } from '../controllers/textSummarizer.controller';

const textSummarizerRouter = express.Router();

textSummarizerRouter.post('/', auth, generateSummary);
textSummarizerRouter.get('/', auth, getSummaries);
textSummarizerRouter.delete('/:id', auth, deleteSummary);

export default textSummarizerRouter;