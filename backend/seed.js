import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from "./src/models/User.js"


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedUsers = async () => {
    try {
        
        await mongoose.connect(MONGO_URI);
        console.log('Conexão com MongoDB para Seed OK.');

        //Limpa usuários existentes 
        await User.deleteMany();
        console.log('Coleção de Usuários limpa.');

        const salt = await bcrypt.genSalt(10);
        const testPassword = await bcrypt.hash('123', salt); 

        // 3. Cria o usuário de teste (TESTE/123)
        const testUser = await User.create({
            userName: 'teste',
            email: 'teste@email.com',
            password: testPassword,
            admin: true, // Para ter um admin de teste
        });

        console.log('Usuário de teste criado com sucesso!');
        process.exit(); 

    } catch (error) {
        console.error('Erro durante o Seed de dados:', error);
        process.exit(1); 
    }
};

seedUsers();