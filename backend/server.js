import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import User from "../models/user"
import authRoutes from "./src/routes/authRoutes.js"
import listRoutes from "./src/routes/listRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import metricsRoutes from "./src/routes/metricsRoutes.js"
import cors from "cors";
dotenv.config();


const app = express()
const port = 3000


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("conectado ao mongodb"); 
    }catch(error){
        console.error("Erro ao conectar ao banco: " + error); 

    }
}

connectdb(); 
app.use(cors());
app.use(express.json()); 

app.get('/wisesave', (req, res) => {
    res.status(200).send("Teste de Roteamento Simples OK.");
});

//trata as autenticações login + cadastro
app.use("/wisesave/auth", authRoutes);
app.use("/wisesave/lists", listRoutes); 
app.use("/wisesave/user", userRoutes);
app.use("/wisesave/metrics", metricsRoutes);



app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
})



