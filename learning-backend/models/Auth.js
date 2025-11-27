// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courseId: { type: String }, // باش نخزنو ال courseId
}, { timestamps: true });

export default mongoose.model("Auth", userSchema);
