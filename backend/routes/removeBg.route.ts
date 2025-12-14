import express from "express";
import { auth } from "../middlewares/auth";
import { removeImageBackground } from "../controllers/removeImageBg.controller";
import { upload } from "../config/multer";

const imageRouter = express.Router();

imageRouter.post("/remove-background", auth, upload.single('image'), removeImageBackground);

export default imageRouter;