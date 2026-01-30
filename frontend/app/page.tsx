export default function Home() {
  return (
    <>
      {/* HERO: тёмный, “дорогой” */}
      <section className="relative overflow-hidden">
        {/* фон: мягкая сетка + световое пятно */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.20]"
               style={{
                 backgroundImage:
                   "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
                 backgroundSize: "64px 64px",
               }}
          />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-56 right-0 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Системные поставки для промышленности
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Поставки промышленного электрооборудования
            </h1>

            <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
              Подбор по ТЗ, быстрые КП, документация и поставка. Работаем аккуратно:
              сроки, прозрачность, ответственность.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contacts"
                className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400"
              >
                Запросить КП
              </a>
              <a
                href="/services"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm text-white/90 hover:border-white/25 hover:bg-white/5"
              >
                Посмотреть услуги
              </a>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Подбор и аналоги</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Помогаем подобрать эквиваленты и оптимизировать спецификацию.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Документация</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Паспорта, сертификаты, протоколы — по запросу.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Сроки и поставка</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Согласовываем сроки и держим коммуникацию на каждом шаге.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция на светлом фоне (контраст и “дороговизна”) */}
      <section className="bg-white text-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">Услуги</h2>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Начинаем с задач “лендинг + страницы”, но закладываем фундамент под каталог.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Подбор по ТЗ",
                desc: "Разберём спецификацию, предложим варианты и сформируем КП.",
              },
              {
                title: "Комплектация",
                desc: "Соберём поставку под проект: позиции, сроки, документы, логистика.",
              },
              {
                title: "Сопровождение",
                desc: "Коммуникация, уточнения, замены, закрывающие — без хаоса.",
              },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="text-base font-semibold">{x.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {x.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Снова тёмная секция: процесс */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold md:text-3xl">Как мы работаем</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Запрос", d: "Вы присылаете ТЗ / спецификацию / описание." },
              { n: "02", t: "Подбор", d: "Уточняем детали, предлагаём варианты и аналоги." },
              { n: "03", t: "КП", d: "Фиксируем цены, сроки, условия и документы." },
              { n: "04", t: "Поставка", d: "Отгрузка и сопровождение до закрывающих." },
            ].map((x) => (
              <div key={x.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs text-zinc-400">{x.n}</div>
                <div className="mt-2 text-base font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-zinc-400">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-base font-semibold">Нужен расчёт?</div>
            <div className="mt-2 text-sm text-zinc-400">
              Напиши, что именно требуется — ответим и соберём КП.
            </div>
            <div className="mt-4">
              <a
                href="/contacts"
                className="inline-flex rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400"
              >
                Запросить КП
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}