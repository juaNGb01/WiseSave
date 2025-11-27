import express from "express"
import {getMonthlySummary} from '../controllers/metricsController.js'

const router = express.Router(); 
const app = express(); 

router.get('/summary', getMonthlySummary);

export default router;