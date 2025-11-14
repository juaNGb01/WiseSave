import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
//import User from "../models/user"
import authRoutes from "./src/routes/auth.js"
import listRoutes from "./src/routes/listRoutes.js";

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

app.use(express.json()); 

app.get('/test', (req, res) => {
    res.status(200).send("Teste de Roteamento Simples OK.");
});

//trata as autenticações login + cadastro
app.use("/wisesave/auth", authRoutes);




app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
})
// ... outro código ...
app.use("/api/auth", authRoutes);

// ▼▼▼ ADICIONE ESTA LINHA AQUI ▼▼▼
app.use("/api/lists", listRoutes); // 2. FALA PARA O APP USAR A NOVA RUTA
// ... resto do código ...