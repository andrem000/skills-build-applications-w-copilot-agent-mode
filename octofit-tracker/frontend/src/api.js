export function apiBaseFor(component) {
  const codeName = import.meta.env.VITE_CODESPACE_NAME;
  if (codeName) {
    return `https://${codeName}-8000.app.github.dev/api/${component}/`;
  }
  // Safe fallback for local development — avoids "undefined" in hostnames
  const proto = (typeof window !== 'undefined' && window.location && window.location.protocol) || 'http:';
  return `${proto}//localhost:8000/api/${component}/`;
}

export async function fetchList(component, url) {
  const target = url || apiBaseFor(component);
  const res = await fetch(target);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  // Support both array and paginated responses
  const items = Array.isArray(data) ? data : (data.results ?? data.data ?? []);
  const next = data.next ?? null;
  const previous = data.previous ?? null;
  return { items, next, previous, raw: data };
}
