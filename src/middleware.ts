import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt_PT'],
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|pt_PT)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
