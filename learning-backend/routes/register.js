// routes/register.js
import express from "express";
import User from "../models/Auth.js";
import Auth from "../models/Auth.js";

const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
  const { name, email, password, courseId } = req.body;

  try {
    // تحقق إذا الايميل موجود
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "الايميل موجود مسبقاً" });
    }

    // إنشاء مستخدم جديد
    const newUser = new Auth({ name, email, password, courseId });
    await newUser.save();

    res.status(201).json({ message: "تم التسجيل بنجاح !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء التسجيل" });
  }
});

export default router;
