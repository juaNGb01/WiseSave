import express from "express"
import { userLogin, registerUser } from "../controllers/authController.js"


const router = express.Router(); 
const app = express(); 


router.post("/login", userLogin); 
router.post("/register", registerUser); 


export default router; 