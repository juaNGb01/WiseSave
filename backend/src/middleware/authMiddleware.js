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
        return res.status(403).json({ message: "Token inválido ou expirado" });
      }

      req.userId = decoded.id;
      next(); 
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao validar token", error: error.message });
  }
};