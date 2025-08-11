import { ensureCsrf } from '@/lib/csrf';
import { API_BASE } from '@/lib/env';
import { getCookie } from '@/lib/cookies';
import { LoginValues } from '@/validations/login.schema';

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

    return { ok: res.ok, status: res.status, payload };
}