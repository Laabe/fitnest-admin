import { clientJson } from './fetcher';
export async function ensureCsrf() {
    await clientJson('/sanctum/csrf-cookie', { method: 'GET' });
}