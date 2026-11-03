const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/project/:projectId', async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name avatar');
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  const io = req.app.get('io');
  if (io) io.to(task.project.toString()).emit('task_created', task);
  res.status(201).json(task);
});

router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
  const io = req.app.get('io');
  if (io) io.to(task.project.toString()).emit('task_updated', task);
  res.json(task);
});

module.exports = router;
