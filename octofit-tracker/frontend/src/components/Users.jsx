import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchList('users');
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
