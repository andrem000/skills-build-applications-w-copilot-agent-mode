import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async (url) => {
    setLoading(true);
    try {
      const res = await fetchList('teams', url);
      setItems(res.items);
      setNext(res.next);
      setPrev(res.previous);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Teams</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((t, i) => (
            <li key={t.id ?? i}>{t.name ?? JSON.stringify(t)}</li>
          ))}
        </ul>
      )}
      <div className="pager">
        {prev && <button onClick={() => load(prev)}>Previous</button>}
        {next && <button onClick={() => load(next)}>Next</button>}
      </div>
    </div>
  );
}
