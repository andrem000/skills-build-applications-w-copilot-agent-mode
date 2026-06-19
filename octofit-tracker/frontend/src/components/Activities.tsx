import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Activities(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async (url?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchList('activities', url);
      setItems(res.items);
      setNext(res.next);
      setPrev(res.previous);
    } catch (e: any) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Activities</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.map((it, i) => (
            <li key={it.id ?? i}>{it.name ?? JSON.stringify(it)}</li>
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
