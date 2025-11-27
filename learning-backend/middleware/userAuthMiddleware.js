import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await AdminUser.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Non autorisé, token invalide" });
    }
  } else {
    return res.status(401).json({ message: "Non autorisé, pas de token" });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Accès réservé aux admins" });
};
