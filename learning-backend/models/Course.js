import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  level: String,
  instructor: String,
  instructorImage: String,
  image: String,
  rating: Number,
  reviews: Number,
  students: Number,
  duration: String,
  lessons: Number,
  price: Number,
  originalPrice: Number,
  bestseller: Boolean,
  new: Boolean,
  lastUpdated: String,
  language: String,
  certificate: Boolean
});

export default mongoose.model("Course", courseSchema);
