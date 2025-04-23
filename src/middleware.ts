import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const EXCLUDED_PATHS = ['/landing', '/admin', 'assets', '/_next/static', '/_next/image'];
const EXACT_EXCLUDED_PATHS = ['/favicon.ico', '/robots.txt', '/sitemap.xml'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자 페이지 접근 처리
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      const url = new URL('/admin/login', request.url);

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // 사용자 페이지 랜딩 리다이렉트 예외 페이지 처리
  if (
    EXCLUDED_PATHS.some(path => pathname.startsWith(path)) ||
    EXACT_EXCLUDED_PATHS.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // 사용자 페이지 랜딩 리다이렉트 처리
  const hasVisited = request.cookies.get('hasVisited')?.value === 'Y';

  if (!hasVisited) {
    const url = new URL('/landing', request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|landing|assets).*)',
  ],
};
