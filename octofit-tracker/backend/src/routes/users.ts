import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.find().select('-__v').lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

export default router;
