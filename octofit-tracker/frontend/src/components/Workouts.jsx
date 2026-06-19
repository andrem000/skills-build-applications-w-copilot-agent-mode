import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchList('workouts');
        setItems(res.items);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((w, i) => (
            <li key={w.id ?? i}>{w.title ?? w.name ?? JSON.stringify(w)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
