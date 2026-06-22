import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Workouts(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : `http://localhost:8000/api/workouts/`;

    (async () => {
      try {
        const res = await fetchList('workouts', apiBase);
        setItems(res.items);
      } catch (e: any) {
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
import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Workouts(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchList('workouts');
        setItems(res.items);
      } catch (e: any) {
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
