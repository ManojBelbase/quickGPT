import express from "express";
import { auth } from "../middlewares/auth";
import { generateDashboardBotResponse } from "../controllers/dashboardBot.controller";

const dashboardBotRouter = express.Router();

dashboardBotRouter.post("/", auth, generateDashboardBotResponse);

export default dashboardBotRouter;
