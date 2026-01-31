type FetchOpts = RequestInit & { next?: { revalidate?: number } };

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "http://localhost:3000";

export async function strapiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const url = `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi fetch failed ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json() as Promise<T>;
}
