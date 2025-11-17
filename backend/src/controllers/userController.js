import User from "../models/User.js";

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
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { username, email },
      { new: true } // retornar o documento atualizado
    ).select("-password")
    res.status(200).json({ message: "Usuário atualizado", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar", error: error.message });
  }
}
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