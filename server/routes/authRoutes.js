import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/admin', protect, authorizeRoles('Admin'), (req, res) => {
  res.json({ message: 'Welcome, Admin' });
});

router.get('/manager', protect, authorizeRoles('Manager', 'Admin'), (req, res) => {
  res.json({ message: 'Welcome, Manager' });
});

export default router;
