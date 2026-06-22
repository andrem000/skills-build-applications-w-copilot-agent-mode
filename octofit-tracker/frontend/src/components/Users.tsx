import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Users(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
      : `http://localhost:8000/api/users/`;

    (async () => {
      try {
        const res = await fetchList('users', apiBase);
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
      <h2>Users</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((u, i) => (
            <li key={u.id ?? i}>{u.username ?? u.email ?? JSON.stringify(u)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Users(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchList('users');
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
      <h2>Users</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((u, i) => (
            <li key={u.id ?? i}>{u.username ?? u.email ?? JSON.stringify(u)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
