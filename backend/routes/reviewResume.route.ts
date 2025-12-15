import express from "express";
import { auth } from "../middlewares/auth";
import { reviewResume } from "../controllers/reviewResume.controller";
import { uploadPdf } from "../config/multer";

const resumeRouter = express.Router();

resumeRouter.post("/review-resume", auth, uploadPdf, reviewResume);

export default resumeRouter;