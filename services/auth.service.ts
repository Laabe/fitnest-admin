import { ensureCsrf } from '@/lib/csrf';
import { API_BASE } from '@/lib/env';
import { getCookie } from '@/lib/cookies';
import { LoginValues } from '@/validations/login.schema';
import {useUserStore} from "@/stores/user";
import {clientJson} from "@/lib/fetcher";

export async function fetchMe() {
    // Works for both cookie mode and token mode because clientJson attaches credentials and Authorization when present
    return clientJson('/api/user');
}

export async function bootstrapUser() {
    try {
        const me: User = await fetchMe();
        useUserStore.getState().setUser(me);
        return me;
    } catch (_) {
        // If not authenticated or request fails, ensure the store is cleared
        useUserStore.getState().clearUser();
        return null;
    }
}

export async function login(values: LoginValues) {
    await ensureCsrf();
    const xsrf = getCookie('XSRF-TOKEN') || '';

    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': xsrf,
        },
        body: JSON.stringify(values),
    });

    let payload: any;
    try { payload = await res.json(); } catch { payload = { message: await res.text() }; }

    if (payload?.token) localStorage.setItem('token', payload.token);
    if (payload?.user) useUserStore.getState().setUser(payload.user);

    return { ok: res.ok, status: res.status, payload };
}

export async function logout(): Promise<boolean> {
    await ensureCsrf();
    const xsrf = getCookie('XSRF-TOKEN') || '';

    const res = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-XSRF-TOKEN': xsrf,
        },
    });

    localStorage.removeItem('token');
    useUserStore.getState().clearUser();

    return res.ok;
}