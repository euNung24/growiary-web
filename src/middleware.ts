import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const EXCLUDED_PATHS = ['/landing', '/admin', '/_next/static', '/_next/image'];
const EXACT_EXCLUDED_PATHS = ['/favicon.ico', '/robots.txt', '/sitemap.xml'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 예외 페이지 처리
  if (
    EXCLUDED_PATHS.some(path => pathname.startsWith(path)) ||
    EXACT_EXCLUDED_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const hasVisited = request.cookies.get('hasVisited')?.value === 'Y';

  if (!hasVisited) {
    const url = new URL('/landing', request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|landing|admin).*)',
  ],
};
