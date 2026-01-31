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
    `${STRAPI_URL}/api/site-setting?populate[headerMenu][populate][items]=*&populate[headerCtaPrimary]=*&populate[headerCtaSecondary]=*`,
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
