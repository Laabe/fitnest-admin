'use server';

import { cookies } from 'next/headers';
import { API_BASE } from './env';

export async function getUser() {
    const res = await fetch(`${API_BASE}/api/user`, {
        credentials: 'include',
        headers: { Accept: 'application/json', cookie: cookies().toString() },
        cache: 'no-store',
    });
    if (res.ok) return res.json();
    return null;
}

export async function requireAuth() {
    const user = await getUser();
    if (!user) throw new Error('UNAUTHENTICATED');
    return user;
}