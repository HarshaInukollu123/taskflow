/* eslint-disable */
import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import User from '../models/User.js';
const router = Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = new User({ email, password, role });
    await user.save();
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;