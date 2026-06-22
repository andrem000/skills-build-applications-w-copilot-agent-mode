export function apiBaseFor(component: string): string {
  const codeName = import.meta.env.VITE_CODESPACE_NAME as string | undefined;
  if (codeName) {
    return `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/${component}/`;
  }
  const proto = (typeof window !== 'undefined' && window.location && window.location.protocol) || 'http:';
  return `${proto}//localhost:8000/api/${component}/`;
}

export type FetchListResult<T> = {
  items: T[];
  next: string | null;
  previous: string | null;
  raw: any;
};

export async function fetchList<T = any>(component: string, url?: string): Promise<FetchListResult<T>> {
  const target = url || apiBaseFor(component);
  const res = await fetch(target);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  const items: T[] = Array.isArray(data) ? data : (data.results ?? data.data ?? []);
  const next = data.next ?? null;
  const previous = data.previous ?? null;
  return { items, next, previous, raw: data };
}
export function apiBaseFor(component: string): string {
  const codeName = import.meta.env.VITE_CODESPACE_NAME as string | undefined;
  if (codeName) {
    return `https://${codeName}-8000.app.github.dev/api/${component}/`;
  }
  const proto = (typeof window !== 'undefined' && window.location?.protocol) || 'http:';
  return `${proto}//localhost:8000/api/${component}/`;
}

export async function fetchList(component: string, url?: string) {
  const target = url || apiBaseFor(component);
  const res = await fetch(target);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const data = await res.json();
  const items = Array.isArray(data) ? data : (data.results ?? data.data ?? []);
  const next = data.next ?? null;
  const previous = data.previous ?? null;
  return { items, next, previous, raw: data } as const;
}
