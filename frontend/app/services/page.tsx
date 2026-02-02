import HeroSection from "../components/HeroSection";
import { fetchPageBySlug, fetchGlobal } from "../lib/strapi";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const [global, page] = await Promise.all([
    fetchGlobal(),
    fetchPageBySlug("services"),
  ]);

  const companyName = global?.company_name || 'ООО "ДВЕНАДЦАТЬ"';

  if (!page) return { title: `Услуги — ${companyName}` };

  return {
    title: page.seo_title || `Услуги — ${companyName}`,
    description: page.seo_description || "",
  };
}

export default async function ServicesPage() {
  const page = await fetchPageBySlug("services");
  if (!page) notFound();

  const sections: any[] = Array.isArray((page as any)?.sections)
    ? (page as any).sections
    : [];

  const hero =
    sections.find((s: any) => s?.__component === "shared.sections-hero") ||
    null;

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
      {/* Hero — компактный, как у «Как мы работаем» */}
      {hero ? <HeroSection data={hero} compact noDivider /> : null}

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl space-y-16">

          {/* Зона ответственности */}
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Что мы делаем
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {[
                {
                  t: "Подбор оборудования",
                  d: [
                    "Подбор под условия эксплуатации и требования ТЗ",
                    "Учёт среды, температур, степени защиты, маркировок",
                    "Проверка совместимости оборудования",
                  ],
                },
                {
                  t: "Формирование спецификаций",
                  d: [
                    "Формирование состава решения",
                    "Фиксация параметров и конфигурации",
                    "Подготовка структуры для согласования и закупки",
                  ],
                },
                {
                  t: "Аналоги и замены",
                  d: [
                    "Подбор эквивалентов при ограничениях по срокам или бюджету",
                    "Анализ технических отличий",
                    "Исключение избыточных Ex-решений",
                  ],
                },
                {
                  t: "Технико-коммерческие предложения",
                  d: [
                    "Подготовка ТКП под требования заказчика или тендера",
                    "Привязка оборудования к спецификации",
                    "Фиксация сроков и условий поставки",
                  ],
                },
                {
                  t: "Поставка",
                  d: [
                    "Комплектация согласованного решения",
                    "Контроль сроков и состава поставки",
                  ],
                },
                {
                  t: "Документация",
                  d: [
                    "Паспорта, сертификаты, протоколы",
                    "Закрывающие документы",
                  ],
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="text-base font-semibold text-white">
                    {x.t}
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-zinc-400">
                    {x.d.map((i) => (
                      <li key={i}>— {i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Когда это имеет смысл */}
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Когда это имеет смысл
            </h2>

            <ul className="mt-6 max-w-3xl space-y-2 text-sm text-zinc-400">
              <li>— типовое решение не подходит</li>
              <li>— оборудование недоступно или снято с производства</li>
              <li>— требуется замена без потери технического смысла</li>
              <li>— есть ограничения по срокам или бюджету</li>
              <li>— ответственность за выбор лежит на службе снабжения</li>
            </ul>
          </div>

          {/* Результат */}
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Результат работы
            </h2>

            <ul className="mt-6 max-w-3xl space-y-2 text-sm text-zinc-400">
              <li>— согласованное техническое решение</li>
              <li>— структурированная спецификация</li>
              <li>— понятное технико-коммерческое предложение</li>
              <li>— зафиксированные сроки и условия</li>
              <li>— комплект документов</li>
              <li>— один ответственный исполнитель</li>
            </ul>
          </div>

          {/* Связка с процессом */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="text-base font-semibold text-white">
              Как мы работаем
            </div>
            <div className="mt-2 max-w-2xl text-sm text-zinc-400">
              Процесс подбора, согласования и поставки описан отдельно.
            </div>
            <div className="mt-4">
              <a
                href="/process"
                className="inline-flex rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white/90 hover:border-white/30 hover:bg-white/5"
              >
                Посмотреть процесс работы
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}