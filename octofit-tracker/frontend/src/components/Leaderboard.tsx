import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Leaderboard(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const apiBase = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : `http://localhost:8000/api/leaderboard/`;

    (async () => {
      try {
        const res = await fetchList('leaderboard', apiBase);
        if (!mounted) return;
        setItems(res.items);
      } catch (e: any) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ol>
          {items.map((u, i) => (
            <li key={u.id ?? i}>{u.username ?? u.name ?? JSON.stringify(u)}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Leaderboard(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchList('leaderboard');
        if (!mounted) return;
        setItems(res.items);
      } catch (e: any) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ol>
          {items.map((u, i) => (
            <li key={u.id ?? i}>{u.username ?? u.name ?? JSON.stringify(u)}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
