import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find().select('-__v').lean();
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ workout });
});

export default router;
