import User from "../models/User.js";
import jwt from 'jsonwebtoken';
// Buscar perfil do usuário 
export const getUserProfile = async (req, res) => {
  try {

    // req.userId foi adicionado pelo middleware
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil", error: error.message });
  }
};

// Atualizar dados do usuário
export const updateUser = async (req, res) => {
  try {

    const { name, email } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.userName = name;
    if (email !== undefined) updateData.email = email;

    console.log("📦 updateData preparado:", updateData);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Nenhum campo para atualizar" });
    }


    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");


    if (!updatedUser) {
      console.log("Usuário não encontrado no banco");
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const token = jwt.sign(
      { userId: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Use o mesmo tempo de expiração do login
    );

    console.log("✅ Usuário atualizado e novo token gerado");

    res.status(200).json({
      message: "Usuário atualizado",
      user: updatedUser,
      token: token // **RETORNE O NOVO TOKEN**
    });

  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar",
      error: error.message
    });
  }
};
// Deletar conta
export const deleteUser = async (req, res) => {
  try {
    console.log("🗑️ Função deleteUser executada!");
    console.log("👤 User ID recebido:", req.userId)
    await User.findByIdAndDelete(req.userId);
    res.status(200).json({ message: "Conta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar conta", error: error.message });
  }
};