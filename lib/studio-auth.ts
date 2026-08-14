import crypto from 'crypto';
const cookieName = 'chaii-studio';
export function studioCookieName() { return cookieName; }
export function studioToken() { return crypto.createHmac('sha256', process.env.STUDIO_SECRET || 'development-only-secret').update('studio-access').digest('hex'); }
export function isStudioAuthorized(value?: string) { return !!process.env.STUDIO_PASSWORD && value === studioToken(); }
