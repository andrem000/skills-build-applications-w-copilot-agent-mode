import { connectDb } from '../database.js';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const seedData = async () => {
  console.log('Seed the octofit_db database with test data');

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Leaderboard.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.create([
    { name: 'Avery Octo', email: 'avery@octofit.io', role: 'member' },
    { name: 'Jordan Tide', email: 'jordan@octofit.io', role: 'coach' },
    { name: 'Morgan Reef', email: 'morgan@octofit.io', role: 'member' }
  ]);

  const teams = await Team.create([
    { name: 'Deep Current', members: [users[0]._id, users[2]._id], score: 1580 },
    { name: 'Coral Sprint', members: [users[1]._id], score: 1425 }
  ]);

  await Activity.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      type: 'run',
      durationMinutes: 52,
      distanceKm: 10.2,
      caloriesBurned: 620,
      date: new Date('2026-06-18T09:00:00Z')
    },
    {
      user: users[2]._id,
      team: teams[0]._id,
      type: 'cycle',
      durationMinutes: 65,
      distanceKm: 28.5,
      caloriesBurned: 810,
      date: new Date('2026-06-18T15:30:00Z')
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      type: 'swim',
      durationMinutes: 35,
      distanceKm: 1.6,
      caloriesBurned: 380,
      date: new Date('2026-06-17T07:20:00Z')
    }
  ]);

  await Leaderboard.create([
    { rank: 1, team: teams[0]._id, points: 1580 },
    { rank: 2, team: teams[1]._id, points: 1425 }
  ]);

  await Workout.create([
    { name: 'Octo HIIT', difficulty: 'hard', durationMinutes: 30, focus: 'strength', suggestedCalories: 410 },
    { name: 'Tide Recovery', difficulty: 'easy', durationMinutes: 20, focus: 'mobility', suggestedCalories: 180 },
    { name: 'Coral Pulse', difficulty: 'medium', durationMinutes: 40, focus: 'endurance', suggestedCalories: 360 }
  ]);

  console.log('Seed data insertion complete');
  process.exit(0);
};

connectDb()
  .then(seedData)
  .catch((error) => {
    console.error('Failed to connect and seed data:', error);
    process.exit(1);
  });
