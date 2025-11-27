import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

export const addCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course added", course });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Course updated", course });
};

export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};
