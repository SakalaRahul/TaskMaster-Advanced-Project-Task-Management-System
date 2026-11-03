const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  const projects = await Project.find().populate('owner members', 'name email avatar');
  res.json(projects);
});

router.post('/', async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

module.exports = router;
