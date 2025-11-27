import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import registerRoutes from "./routes/register.js";
import courseRoutes from "./routes/courseRoutes.js";
import instructorsRoutes from './routes/instructors.js';
import userAdminRoutes from "./routes/userAdminRoute.js";

dotenv.config();

const app = express();

// Middleware (remove duplicates)
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connectée avec succès"))
  .catch((err) => console.log("❌ Erreur MongoDB :", err));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/instructors', instructorsRoutes);
app.use("/api/users", userAdminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));