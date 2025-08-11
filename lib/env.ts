const base = process.env.NEXT_PUBLIC_API_BASE;
if (!base) {
    // Fail fast with a clear message in dev
    throw new Error('NEXT_PUBLIC_API_BASE is not set. Add it to .env.local (e.g., http://localhost:80) and restart Next.js.');
}
export const API_BASE = base;
