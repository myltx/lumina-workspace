import type { NextAuthConfig } from "next-auth";

import { routing } from './i18n/routing';

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/contact', '/about', '/pricing', '/pricing-plans', '/'];
const authRoutes = ['/login', '/register'];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
        return true;
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

      console.log(`[AUTH DEBUG] path: ${pathname}, withoutLocale: ${pathWithoutLocale}, isLoggedIn: ${isLoggedIn}, isAuthRoute: ${isAuthRoute}, isPublicRoute: ${isPublicRoute}`);

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !isPublicRoute) {
        console.log(`[AUTH DEBUG] Blocking access to ${pathname}`);
        return false;
      }

      return true;
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
