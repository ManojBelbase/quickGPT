import express from "express";
import { auth } from "../middlewares/auth";
import { getRemovedBackgroundImages, removeImageBackground } from "../controllers/removeImageBg.controller";
import { upload } from "../config/multer";

const imageRouter = express.Router();

imageRouter.post("/", auth, upload.single('image'), removeImageBackground);
imageRouter.get("/", auth, getRemovedBackgroundImages);

export default imageRouter;