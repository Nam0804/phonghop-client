import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/');
  

  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'vn'],
    defaultLocale: 'en',
    localePrefix: 'always' 
  });
  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/([\\w-]+)?/users/(.+)'
  ]};