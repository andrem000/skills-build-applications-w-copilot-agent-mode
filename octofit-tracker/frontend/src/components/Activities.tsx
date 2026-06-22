import React, { useEffect, useState } from 'react';
import { fetchList } from '../api';

export default function Activities(): JSX.Element {
  const [items, setItems] = useState<any[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBase = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : `http://localhost:8000/api/activities/`;

  const load = async (url?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchList('activities', url ?? apiBase);
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
