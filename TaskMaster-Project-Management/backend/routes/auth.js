const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET || 'taskmaster_jwt_secret_key_2026_production');
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET || 'taskmaster_jwt_secret_key_2026_production');
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;
