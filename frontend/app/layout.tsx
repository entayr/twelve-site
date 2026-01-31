import "./globals.css";
import Link from "next/link";
import { fetchGlobal, fetchSiteSetting } from "./lib/strapi";

export async function generateMetadata() {
  const global = await fetchGlobal();

  const companyName = global?.company_name || "ООО «12»";

  return {
    title: `${companyName} — поставки промышленного электрооборудования`,
    description:
      "Поставки промышленного и взрывозащищённого электрооборудования для предприятий",
  };
}

function normalizeHref(item: any): string | null {
  const type = item?.type;

  // Strapi menu-item: поле url используется и для internal, и для external
  const raw =
    item?.url ||
    (type === "internal"
      ? item?.slug || item?.path || item?.href
      : item?.href);

  if (!raw || typeof raw !== "string") return null;

  const val = raw.trim();
  if (!val) return null;

  if (type === "internal") {
    return val.startsWith("/") ? val : `/${val}`;
  }

  // external: если забыли протокол — добавляем https://
  if (val.startsWith("http://") || val.startsWith("https://")) return val;
  return `https://${val}`;
}


function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || /^mailto:/i.test(href) || /^tel:/i.test(href);
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await fetchGlobal();
  const siteSetting = await fetchSiteSetting();

  const companyName = global?.company_name || 'ООО "ДВЕНАДЦАТЬ"';
  const email = global?.contacts_email || "mail@t-welve.ru";
  const phone = global?.contacts_phone || "+7 (911) 003-03-07";
  const address = global?.contacts_address || "Санкт-Петербург";

  // Fallback меню (если Strapi пустой или не заполнен)
  const fallbackMenu = [
    { label: "О компании", type: "internal", slug: "/about", isVisible: true, order: 10 },
    { label: "Услуги", type: "internal", slug: "/services", isVisible: true, order: 20 },
    { label: "Контакты", type: "internal", slug: "/contacts", isVisible: true, order: 30 },
  ];

  // Вытягиваем items из Strapi (учитывая, что headerMenu может быть массивом)
  const rawItems =
    siteSetting?.headerMenu?.[0]?.items ||
    siteSetting?.headerMenu?.items ||
    null;

  const menuItems: any[] = Array.isArray(rawItems) ? rawItems : [];

  const navItems = (menuItems.length ? menuItems : fallbackMenu)
    .filter((i: any) => i?.isVisible !== false)
    .sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((i: any) => {
      const href = normalizeHref(i);
      return {
        label: i?.label || i?.title || "Ссылка",
        href,
        type: (i?.type || "internal") as "internal" | "external",
      };
    })
    .filter((i: any) => !!i?.href);

  // CTA buttons in header (from Strapi; fallback if empty)
  const fallbackCtaSecondary: any = { label: "Связаться", type: "internal", slug: "/contacts", isVisible: true };
  const fallbackCtaPrimary: any = { label: "Запросить КП", type: "internal", slug: "/contacts", isVisible: true };

  const rawCtaSecondary: any = siteSetting?.headerCtaSecondary ?? null;
  const rawCtaPrimary: any = siteSetting?.headerCtaPrimary ?? null;

  const ctaSecondary =
    rawCtaSecondary?.isVisible === false
      ? null
      : (() => {
          const src = rawCtaSecondary ?? fallbackCtaSecondary;
          const href = normalizeHref(src);
          if (!href) return null;
          return { label: src?.label || "Связаться", href };
        })();

  const ctaPrimary =
    rawCtaPrimary?.isVisible === false
      ? null
      : (() => {
          const src = rawCtaPrimary ?? fallbackCtaPrimary;
          const href = normalizeHref(src);
          if (!href) return null;
          return { label: src?.label || "Запросить КП", href };
        })();


  return (
    <html lang="ru">
      <body className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0c]/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <span className="text-sm font-semibold tracking-tight">12</span>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">{companyName}</div>
                  <div className="text-xs text-zinc-400">
                    Поставки электрооборудования
                  </div>
                </div>
              </Link>

              <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
                {navItems.map((item: any) => (
                  <SmartLink
                    key={`${item.href}-${item.label}`}
                    className="hover:text-white/90" href={item.href}
                    {...(item.type === "external"
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </SmartLink>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                {ctaSecondary && (
                  <a
                    href={ctaSecondary.href}
                    className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:border-white/25 hover:bg-white/5"
                  >
                    {ctaSecondary.label}
                  </a>
                )}
                {ctaPrimary && (
                  <a
                    href={ctaPrimary.href}
                    className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400"
                  >
                    {ctaPrimary.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-white/10 bg-[#0b0b0c]">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold">{companyName}</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Поставки промышленного электрооборудования. Подбор, документация,
                  поставка.
                </div>
              </div>

              <div className="text-sm text-zinc-300">
                <div className="font-semibold text-white">Навигация</div>
                <div className="mt-2 grid gap-2">
                  {navItems.map((item: any) => (
                    <SmartLink
                      key={`footer-${item.href}-${item.label}`}
                      className="text-zinc-400 hover:text-white" href={item.href}
                      {...(item.type === "external"
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </SmartLink>
                  ))}
                </div>
              </div>

              <div className="text-sm text-zinc-300">
                <div className="font-semibold text-white">Контакты</div>
                <div className="mt-2 grid gap-2 text-zinc-400">
                  <div>{email}</div>
                  <div>{phone}</div>
                  <div>{address}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-xs text-zinc-500">
              © {new Date().getFullYear()} {companyName}. Все права защищены.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
