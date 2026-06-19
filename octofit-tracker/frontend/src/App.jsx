import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

export default function App() {
  return (
    <main className="app-shell">
      <header>
        <h1>OctoFit Tracker</h1>
        <nav className="main-nav">
          <Link to="/activities">Activities</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/users">Users</Link>
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
      </header>

      <section className="view">
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </section>
    </main>
  );
}
