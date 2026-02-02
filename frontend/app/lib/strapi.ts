const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";

export type GlobalData = {
  id: number;
  documentId: string;
  company_name?: string;
  contacts_email?: string;
  contacts_phone?: string;
  contacts_address?: string;
  company_description?: any;
};

export async function fetchGlobal(): Promise<GlobalData | null> {
  const res = await fetch(`${STRAPI_URL}/api/global`, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("fetchGlobal failed:", res.status, txt);
    return null;
  }

  const json = (await res.json()) as { data: GlobalData | null };
  return json.data ?? null;
}

export async function fetchSiteSetting() {
  const res = await fetch(
    `${STRAPI_URL}/api/site-setting?populate[headerMenu][populate][items]=*&populate[headerCtaPrimary]=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("fetchSiteSetting failed:", res.status, txt);
    return null;
  }

  const json = await res.json();
  console.log("[fetchSiteSetting] keys:", Object.keys(json || {}));
  console.log(
    "[fetchSiteSetting] data preview:",
    JSON.stringify(json, null, 2).slice(0, 1500)
  );

  return json?.data ?? null;
}

export type PageData = {
  id: number;
  documentId?: string;
  title?: string;
  slug?: string;
  content?: any;
  seo_title?: string;
  seo_description?: string;
  sections?: any;
};

export async function fetchPageBySlug(slug: string): Promise<PageData | null> {
  const q = new URLSearchParams();
  q.set("filters[slug][$eq]", slug);
  // ВАЖНО: content — не relation, его не нужно populate'ить отдельным ключом.
  // populate="*" достаточно для компонентов/relations (и не ломает обычные поля).
  q.set("populate", "*");

  const url = `${STRAPI_URL}/api/pages?${q.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("fetchPageBySlug failed:", res.status, txt);
    console.error("fetchPageBySlug url:", url);
    return null;
  }

  const json = (await res.json()) as { data?: PageData[] };
  const item = Array.isArray(json?.data) ? json.data[0] : null;
  console.log('[fetchPageBySlug] slug:', slug, 'keys:', item ? Object.keys(item) : null);
  console.log('[fetchPageBySlug] title:', item?.title, 'hasContent:', Array.isArray((item as any)?.content), 'contentLen:', ((item as any)?.content?.length ?? null));
  return item ?? null;
}
