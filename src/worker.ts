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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const canonical = toCanonicalUrl(url);

    if (canonical.href !== url.href) {
      return Response.redirect(canonical.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
