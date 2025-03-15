import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isApprovedHost =
    request.nextUrl.host === 'loriboiler.com' || 'localhost:3000'
  const isSliceSimulator = request.nextUrl.pathname === '/slice-simulator'

  let cspHeader
  if (isSliceSimulator && isApprovedHost) {
    cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' https://loriboiler.prismic.io/ https://static.cdn.prismic.io/ https://www.googletagmanager.com/ 'strict-dynamic' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: images.prismic.io images.unsplash.com prismic-io.s3.amazonaws.com;
      font-src 'self' 'nonce-${nonce}';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-src 'self' https://loriboiler.prismic.io/ https://www.google.com/;
      upgrade-insecure-requests;
      connect-src 'self' https://www.google-analytics.com/;
  `
  } else {
    cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' https://loriboiler.prismic.io/ https://static.cdn.prismic.io/ https://www.googletagmanager.com/ 'strict-dynamic' 'unsafe-eval';
      script-src-elem 'self' 'nonce-${nonce}' https://www.loriboiler.com https://loriboiler.prismic.io/ https://static.cdn.prismic.io/ https://www.googletagmanager.com/ http://localhost:3000/ https://prismic.io/;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: images.prismic.io images.unsplash.com prismic-io.s3.amazonaws.com;
      font-src 'self' 'nonce-${nonce}';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-src 'self' https://loriboiler.prismic.io/ https://www.google.com/;
      frame-ancestors 'none';
      upgrade-insecure-requests;
      connect-src 'self' https://www.google-analytics.com/;
  `
  }

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  const requestHeaders = new Headers(request.headers)
  if (request.nextUrl.hostname !== 'localhost')
    requestHeaders.set('x-nonce', nonce)

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  )

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue,
  )

  return response
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
