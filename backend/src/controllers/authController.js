import User from "../models/User.js";
import bcrypt from "bcryptjs"



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
        })

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            message: 'Registro bem-sucedido!'
        });
    } catch (error) {
        console.log("Erro durante criação da conta: ", error);
        res.status(500).json({ message: "Erro dunrante a crição do usuário" + error });
    }
};



export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //verifica se o user existe
        if (!user) {
            return res.status(404).json({ message: "Usuário não existe" });
        }
        //compara se a senha do user está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json({
                _id: user._id,
                name: user.userName,
                email: user.email,
                token: 'token_simulado_12345', // <-- Simulação de token
                message: 'Login efetuado com sucesso!'
            });
        } else {
            return res.status(401).json({ message: "Senha incorreta" });
        }

    } catch (error) {
        console.error("Erro durante login:", error);
        res.status(500).json({ message: `erro durante login` });
    }
}