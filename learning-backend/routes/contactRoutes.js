import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// 📤 Ajouter un message de contact
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires." });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur." });
  }
});

export default router;
