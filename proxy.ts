import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// photonica.chaii.wtf serves the Photonica section from this same deployment:
// photonica.chaii.wtf/        -> /photonica
// photonica.chaii.wtf/docs/... -> /photonica/docs/...
export function proxy(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (!host.startsWith('photonica.')) return;
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/photonica')) return;
  return NextResponse.rewrite(new URL(`/photonica${pathname === '/' ? '' : pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!_next|images|favicon.ico|robots.txt|sitemap.xml|api).*)'],
};
