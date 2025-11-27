// models/Instructor.js
import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  category: { type: String },
  image: { type: String },
  rating: { type: Number, default: 5 },
  students: { type: Number, default: 0 },
  courses: { type: Number, default: 0 },
  description: { type: String },
  achievements: [String],
  social: {
    linkedin: String,
    twitter: String,
    website: String
  }
});

export default mongoose.model('Instructor', InstructorSchema);
