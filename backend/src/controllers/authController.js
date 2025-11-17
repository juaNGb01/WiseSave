import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}

export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const userExist = await User.findOne({ userName });
        const emailExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "nome de usuário já existe" });
        }

        if (emailExist) {
            return res.status(400).json({ message: "email já cadastrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassWord = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            userName,
            email,
            password: hashPassWord
        });

        const token = generateToken(newUser._id);


        res.status(201).json({
            message: 'Registro bem-sucedido!',
            token,
            user: {
                id: newUser._id,
                name: newUser.userName,
                email: newUser.email
            }
        });
    } catch (error) {
        console.log("Erro durante criação da conta: ", error);
        res.status(500).json({ message: "Erro durante a criação do usuário: " + error.message });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Verifica se o user existe
        if (!user) {
            return res.status(404).json({ message: "Usuário não existe" });
        }

        // Compara se a senha do user está correta
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            id: user._id,
            name: user.userName,
            email: user.email,
            message: 'Login efetuado com sucesso!',
            token
        }
        );


    } catch (error) {
        console.error("Erro durante login:", error);
        res.status(500).json({ message: "Erro durante login: " + error.message });
    }
}