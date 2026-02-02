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

  const companyName = global?.company_name || "{companyName}";
  const email = global?.contacts_email || "mail@t-welve.ru";
  const phone = global?.contacts_phone || "+7 (911) 003-03-07";
  const address = global?.contacts_address || "Санкт-Петербург";

  // Fallback меню (если Strapi пустой или не заполнен)
const fallbackMenu = [
  { label: "Как мы работаем", type: "internal", slug: "/#process", isVisible: true, order: 10 },
  { label: "Когда мы полезны", type: "internal", slug: "/#useful", isVisible: true, order: 20 },
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
  const fallbackCtaPrimary: any = { label: "Описать задачу", type: "internal", slug: "/contacts", isVisible: true };

  const rawCtaPrimary: any = siteSetting?.headerCtaPrimary ?? null;


  const ctaPrimary =
    rawCtaPrimary?.isVisible === false
      ? null
      : (() => {
          const src = rawCtaPrimary ?? fallbackCtaPrimary;
          const href = normalizeHref(src);
          if (!href) return null;
          return { label: src?.label || "Описать задачу", href };
        })();


  return (
    <html lang="ru">
      <body className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0c]/80 backdrop-blur">
          <div className="w-full px-6">
            <div className="flex h-16 items-center">
              <Link href="/" className="flex items-center gap-3">
<div className="grid h-14 w-14 place-items-center rounded-xl border border-white/10 bg-white/5">
  <img
    src="/logo-12.svg"
    alt='ООО "Двенадцать"'
    className="h-12 w-12 opacity-90"
  />
</div>
            {/* бейдж */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Системные поставки для промышленности
            </div>
              </Link>

<div className="ml-auto flex items-center gap-4">
  {/* MENU */}
  <div className="hidden md:flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
    <nav className="flex items-center gap-5 text-sm text-white/80">
      {navItems.map((item: any) => (
        <SmartLink
          key={`${item.href}-${item.label}`}
          className="text-white/80 hover:text-white"
          href={item.href}
        >
          {item.label}
        </SmartLink>
      ))}
    </nav>
  </div>

  {/* CTA */}
  {ctaPrimary && (
    <a
      href={ctaPrimary.href}
      className="inline-flex rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 hover:border-white/30 hover:bg-white/5"
    >
      {ctaPrimary.label}
    </a>
  )}
</div>
            </div>
          </div>
        </header>

        <main>{children}</main>

<footer className="border-t border-white/10 bg-[#0e0f12]">
<div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  <div className="w-full px-6">
    <div className="mx-auto max-w-6xl py-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-4">
        {/* О компании (кратко, без “ООО” в брендинге) */}
        <div>
          <div className="text-sm font-semibold text-white">{companyName}</div>
         <div className="mt-2 max-w-xs text-[11px] leading-snug text-zinc-500 md:text-xs">
  Технико-коммерческие решения для промышленных задач в электрооборудовании.
</div>
        </div>

        {/* Навигация (новая структура) */}
        <div className="text-sm text-zinc-300">
          <div className="font-semibold text-white">Навигация</div>
          <div className="mt-3 grid gap-2">
            {navItems.map((item: any) => (
              <SmartLink
                key={`footer-${item.href}-${item.label}`}
                className="text-zinc-400 hover:text-white"
                href={item.href}
                {...(item.type === "external"
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {item.label}
              </SmartLink>
            ))}
          </div>
        </div>

        {/* Документы (юридические ссылки) */}
        <div className="text-sm text-zinc-300">
          <div className="font-semibold text-white">Документы</div>
          <div className="mt-3 grid gap-2">
            <SmartLink className="text-zinc-400 hover:text-white" href="/privacy">
              Политика обработки персональных данных
            </SmartLink>
            <SmartLink className="text-zinc-400 hover:text-white" href="/legal">
              Юридическая информация
            </SmartLink>
          </div>
        </div>

        {/* Контакты */}
        <div className="text-sm text-zinc-300">
          <div className="font-semibold text-white">Контакты</div>
          <div className="mt-3 grid gap-2 text-zinc-400">
            <div>{email}</div>
            <div>{phone}</div>
            <div>{address}</div>
          </div>
        </div>
      </div>

      {/* нижняя строка */}
      <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} {companyName}. Все права защищены.
        </div>
        <div>ИНН 7811813433 | ОГРН 1267800001590</div>
      </div>
    </div>
  </div>
</footer>
      </body>
    </html>
  );
}
