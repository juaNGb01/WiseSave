import express from "express"
import {getMonthlySummary} from '../controllers/metricsController.js'
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router(); 
const app = express(); 

router.get('/summary', authenticateToken, getMonthlySummary);

export default router;