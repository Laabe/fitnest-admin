import { API_BASE } from './env';

export async function clientJson(path: string, init: RequestInit = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        credentials: 'include',
        headers: { 'Accept': 'application/json', ...(init.headers || {}) },
        cache: 'no-store',
    });
    if (!res.ok) throw new Error(await res.text().catch(() => `${res.status} ${res.statusText}`));
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
}