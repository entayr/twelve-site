import "./globals.css";
import { fetchGlobal } from "./lib/strapi";


export async function generateMetadata() {
  const global = await fetchGlobal();

  const companyName =
    global?.company_name || "ООО «12»";

  return {
    title: `${companyName} — поставки промышленного электрооборудования`,
    description:
      "Поставки промышленного и взрывозащищённого электрооборудования для предприятий",
  };
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await fetchGlobal();

  const companyName = global?.company_name || "ООО \"ДВЕНАДЦАТЬ\"";
  const email = global?.contacts_email || "mail@t-welve.ru";
  const phone = global?.contacts_phone || "+7 (911) 003-03-07";
  const address = global?.contacts_address || "Санкт-Петербург";

  return (
    <html lang="ru">
      <body className="min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0c]/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex h-16 items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <span className="text-sm font-semibold tracking-tight">12</span>
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">{companyName}</div>
                  <div className="text-xs text-zinc-400">
                    Поставки электрооборудования
                  </div>
                </div>
              </a>

              <nav className="hidden items-center gap-6 text-sm text-zinc-200 md:flex">
                <a className="hover:text-white/90" href="/about">
                  О компании
                </a>
                <a className="hover:text-white/90" href="/services">
                  Услуги
                </a>
                <a className="hover:text-white/90" href="/contacts">
                  Контакты
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="/contacts"
                  className="rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:border-white/25 hover:bg-white/5"
                >
                  Связаться
                </a>
                <a
                  href="/contacts"
                  className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400"
                >
                  Запросить КП
                </a>
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
                  <a className="text-zinc-400 hover:text-white" href="/about">
                    О компании
                  </a>
                  <a className="text-zinc-400 hover:text-white" href="/services">
                    Услуги
                  </a>
                  <a className="text-zinc-400 hover:text-white" href="/contacts">
                    Контакты
                  </a>
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