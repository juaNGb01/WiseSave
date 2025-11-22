import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 
    console.log("🔑 Token extraído:", token);

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("❌ Erro ao verificar token:", err.message);
        return res.status(403).json({ message: "Token inválido ou expirado" });
      }

      req.userId = decoded.id;
      console.log("✅ userId extraído do token:", req.userId); // 🔥 LOG IMPORTANTE
      console.log("✅ Decoded completo:", decoded); // 🔥 Ver todo o payload
      next(); 
    });

  } catch (error) {
    console.log("❌ Erro no middleware:", error.message);
    res.status(500).json({ message: "Erro ao validar token", error: error.message });
  }
};