import express from "express";
import { auth } from "../middlewares/auth";
import { upload } from "../config/multer";
import { getReplaceBackground, ReplaceBackgroundFromImage } from "../controllers/replaceBackground.controller";

const ReplaceBackgroundRouter = express.Router();

ReplaceBackgroundRouter.post("/", auth, upload.single('image'), ReplaceBackgroundFromImage);
ReplaceBackgroundRouter.get("/", auth, getReplaceBackground);

export default ReplaceBackgroundRouter;