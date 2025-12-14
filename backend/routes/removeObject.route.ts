import express from "express";
import { auth } from "../middlewares/auth";
import { upload } from "../config/multer";
import { removeObjectFromImage } from "../controllers/removeObject.controller";

const imageRouter = express.Router();

imageRouter.post("/replace-background", auth, upload.single('image'), removeObjectFromImage);

export default imageRouter;