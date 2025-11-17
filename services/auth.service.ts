import { API_BASE } from '@/lib/env';
import { LoginValues } from '@/validations/login.schema';
import {storage} from "@/lib/storage";


export async function login(values: LoginValues) {
    const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    let payload: any;
    try { payload = await res.json(); } catch { payload = { message: await res.text() }; }

    if (payload?.token) storage.setToken(payload.token);
    if (payload?.user) storage.setUser(payload.user);

    return { ok: res.ok, status: res.status, payload };
}

export async function logout(): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storage.getToken() || ''}`,
        },
    });

    storage.clearToken()
    storage.clearUser()
    return res.ok;
}