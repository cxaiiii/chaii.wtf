import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (host.startsWith('photonica.') && req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/photonica', req.url));
  }
}
