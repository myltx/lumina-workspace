import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/contact', '/about', '/pricing', '/pricing-plans', '/'];
const authRoutes = ['/login', '/register'];

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return intlMiddleware(req);
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  const possibleLocale = pathSegments[0];
  
  let pathWithoutLocale = pathname;
  if ((routing.locales as readonly string[]).includes(possibleLocale)) {
    pathWithoutLocale = '/' + pathSegments.slice(1).join('/');
  }
  if (pathWithoutLocale === '') pathWithoutLocale = '/';

  const isAuthRoute = authRoutes.includes(pathWithoutLocale);
  const isPublicRoute = publicRoutes.some(
    route => pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
