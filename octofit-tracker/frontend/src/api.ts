export function apiBaseFor(component: string): string {
  const codeName = (import.meta.env.VITE_CODESPACE_NAME as string | undefined) || '';
  if (codeName) {
    return `https://${codeName}-8000.app.github.dev/api/${component}/`;
  }
  const proto = (typeof window !== 'undefined' && window.location?.protocol) || 'http:';
  return `${proto}//localhost:8000/api/${component}/`;
}

export type FetchListResult<T> = {
  items: T[];
  next: string | null;
  previous: string | null;
  raw: any;
};

function extractItemsFromResponse<T = any>(data: any, component: string): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as T[];
  // common paginated shapes
  if (Array.isArray(data.results)) return data.results as T[];
  if (Array.isArray(data.data)) return data.data as T[];
  if (Array.isArray(data.items)) return data.items as T[];
  // backend returns wrapped object like { users: [...] }
  const pluralKey = component.endsWith('/') ? component.slice(0, -1) : component;
  const simpleKey = pluralKey.replace(/s$/i, '');
  if (Array.isArray(data[pluralKey])) return data[pluralKey] as T[];
  if (Array.isArray(data[simpleKey])) return data[simpleKey] as T[];
  // fallback: find first array value on the object
  for (const key of Object.keys(data)) {
    if (Array.isArray(data[key])) return data[key] as T[];
  }
  return [];
}

export async function fetchList<T = any>(component: string, url?: string): Promise<FetchListResult<T>> {
  const target = url || apiBaseFor(component.replace(/^\/+|\/+$/g, ''));
  const res = await fetch(target);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  const items: T[] = extractItemsFromResponse<T>(data, component.replace(/^\/+|\/+$/g, ''));
  const next = data.next ?? null;
  const previous = data.previous ?? null;
  return { items, next, previous, raw: data };
}
