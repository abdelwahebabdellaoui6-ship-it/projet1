import AdminUser from "../models/AdminUser.js";
import jwt from "jsonwebtoken";

// Générer Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// 🔹 Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existUser = await AdminUser.findOne({ email });
  if (existUser) return res.status(400).json({ message: 'Email déjà utilisé' });

  const user = await AdminUser.create({ username, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Données invalides' });
  }
};

// 🔹 Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await AdminUser.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe invalide' });
  }
};

// 🔹 Get all users (Admin)
export const getUsers = async (req, res) => {
  const users = await AdminUser.find().select('-password');
  res.json(users);
};

// 🔹 Get single user
export const getUserById = async (req, res) => {
  const user = await AdminUser.findById(req.params.id).select('-password');
  if (user) res.json(user);
  else res.status(404).json({ message: 'Utilisateur non trouvé' });
};

// 🔹 Update user
export const updateUser = async (req, res) => {
  const user = await AdminUser.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    if (req.body.password) user.password = req.body.password;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
};

// 🔹 Delete user
export const deleteUser = async (req, res) => {
  const user = await AdminUser.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'Utilisateur supprimé' });
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
};
