// routes/instructors.js
import express from 'express';
import Instructor from '../models/Instructor.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  const instructor = new Instructor(req.body);
  try {
    const newInstructor = await instructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInstructor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Instructor supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
