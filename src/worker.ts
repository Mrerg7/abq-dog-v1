interface Env {
  ASSETS: Fetcher;
}

function toCanonicalUrl(requestUrl: URL): URL {
  const target = new URL(requestUrl.href);
  target.protocol = 'https:';

  if (target.hostname.startsWith('www.')) {
    target.hostname = target.hostname.slice(4);
  }

  if (target.pathname === '/index.html' || target.pathname === '/index.htm') {
    target.pathname = '/';
  }

  return target;
}

function securityHeaders(): Headers {
  const h = new Headers();
  // HTTPS enforcement (Cloudflare already terminates TLS; HSTS pins apex)
  h.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('X-Frame-Options', 'SAMEORIGIN');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  // Free-plan friendly CSP: static site + Cloudflare Stream + Google Fonts only
  h.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://customer-wa9cpywo3l4jte5c.cloudflarestream.com",
      'media-src https://customer-wa9cpywo3l4jte5c.cloudflarestream.com',
      "frame-src https://customer-wa9cpywo3l4jte5c.cloudflarestream.com",
      "connect-src 'self'",
      "form-action 'self' mailto:",
      "base-uri 'self'",
      "frame-ancestors 'self'",
    ].join('; ')
  );
  return h;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const canonical = toCanonicalUrl(url);

    if (canonical.href !== url.href) {
      return Response.redirect(canonical.toString(), 301);
    }

    const res = await env.ASSETS.fetch(request);
    // Clone so we can append security headers without mutating the asset response.
    const out = new Response(res.body, res);
    const sec = securityHeaders();
    sec.forEach((v, k) => out.headers.set(k, v));
    // Long-cache immutable build assets; HTML stays fresh for SEO deploys.
    const ct = out.headers.get('content-type') || '';
    const isHtml = ct.includes('text/html');
    if (!isHtml && (url.pathname.startsWith('/_assets/') || url.pathname.startsWith('/_astro/'))) {
      out.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    return out;
  },
};
