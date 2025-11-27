import express from "express";
import { protect, admin } from "../middleware/userAuthMiddleware.js";
import { 
  registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser 
} from "../controllers/userController.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin CRUD routes
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
