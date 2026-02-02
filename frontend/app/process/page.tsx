// app/process/page.tsx
export default function ProcessPage() {
  return (
    <>
     <section className="relative overflow-hidden border-b border-white/10">
  {/* background like HOME hero */}
  <div className="pointer-events-none absolute inset-0">
    <div
      className="absolute inset-0 opacity-[0.20]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    />
    {/* main spot (same “DNA”) */}
    <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
    <div className="absolute -bottom-56 right-0 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
  </div>

  <div className="w-full px-6">
    <div className="mx-auto max-w-6xl py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Как мы работаем
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
        Мы берём на себя формирование технико-коммерческого решения: от запроса до поставки и закрывающих документов.
        Работаем прозрачно, фиксируем договорённости и держим сроки.
      </p>
    </div>
  </div>
</section>

      {/* Процесс */}
      <section className="border-b border-white/10">
        <div className="w-full px-6">
          <div className="mx-auto max-w-6xl py-14 md:py-16">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Этапы работы
            </h2>

            {/* Список этапов: вертикально, спокойнее чем на главной */}
            <div className="mt-10 grid gap-6">
              {[
                {
                  n: "01",
                  t: "Запрос",
                  d: "Вы присылаете ТЗ / спецификацию / описание задачи и сроки.",
                  note:
                    "На этом этапе важно понять контекст. Можно прислать файл или просто описать ситуацию текстом.",
                },
                {
                  n: "02",
                  t: "Анализ",
                  d: "Уточняем требования и ограничения, предлагаем варианты.",
                  note:
                    "Собираем критичные параметры: среда, сертификация, совместимость, бюджет, риски и возможные замены.",
                },
                {
                  n: "03",
                  t: "Спецификация",
                  d: "Фиксируем состав решения, сроки, документацию и условия.",
                  note:
                    "После согласования состав становится опорной точкой: по нему формируется поставка и документы.",
                },
                {
                  n: "04",
                  t: "Поставка",
                  d: "Организуем отгрузку и сопровождаем до закрывающих.",
                  note:
                    "Держим коммуникацию, контролируем статусы, помогаем закрыть комплект документов по запросу.",
                },
              ].map((x) => (
                <div
                  key={x.n}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                    <div className="shrink-0">
                      <div className="text-xs text-zinc-400">{x.n}</div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        {x.t}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="text-sm text-zinc-300 md:text-base">
                        {x.d}
                      </div>
                      <div className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
                        {x.note}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Наша роль */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="text-base font-semibold text-white">
                  Наша роль в проекте
                </div>
                <div className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Мы берём на себя формирование технико-коммерческого решения и
                  ответственность за подбор оборудования: от анализа вводных до
                  согласуемой спецификации и поставки.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="text-base font-semibold text-white">
                  Когда это особенно удобно
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-zinc-400">
                  {[
                    "нет типового решения в каталогах производителей",
                    "нужно заменить недоступные/снятые позиции",
                    "важно уложиться в бюджет без избыточных Ex-решений",
                    "сроки критичны — нужна грамотная компоновка",
                    "нужно спокойное согласование и комплект документов",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Финальный CTA — один, спокойный */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="text-base font-semibold text-white">
                Если у вас есть задача — опишите её
              </div>
              <div className="mt-2 max-w-3xl text-sm text-zinc-400">
                Чем подробнее исходные данные и сроки, тем быстрее мы предложим
                согласуемое технико-коммерческое решение.
              </div>
              <div className="mt-4">
                <a
                  href="/contacts"
                  className="inline-flex rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400"
                >
                  Описать задачу
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}