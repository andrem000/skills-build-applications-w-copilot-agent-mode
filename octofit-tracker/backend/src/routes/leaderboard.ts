import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (req, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('team', 'name score')
    .select('-__v')
    .lean();
  res.json(leaderboard);
});

export default router;
