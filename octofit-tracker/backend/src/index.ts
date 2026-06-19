import express from 'express';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { connectDb } from './config/database.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running.',
    apiUrl: apiHost,
    environment: codespaceName ? 'codespaces' : 'local'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

connectDb()
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on http://localhost:${port}`);
      console.log(`API base URL: ${apiHost}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error', error);
    process.exit(1);
  });
