import express from 'express';
import { auth } from '../middlewares/auth';
import { getDashboardStats } from '../controllers/dashboard.controller';

const dashboardStats = express.Router();

dashboardStats.get('/', auth, getDashboardStats);

export default dashboardStats;
