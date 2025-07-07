const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyFirebaseToken = require('../middleware/firebaseAuth');

// GET all tasks
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const userId = req.user.uid; 
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/',verifyFirebaseToken, async (req, res) => {
  const newTask = new Task({
    taskName: req.body.taskName,
    completed: req.body.completed,
    userId: req.user.uid
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a task
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure the logged-in user is the owner
    if (task.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Not allowed to update this task' });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
