export default function Home() {
  return (
    <>
      {/* HERO: тёмный, “дорогой” */}
      <section id="top" className="relative overflow-hidden">
        {/* фон: мягкая сетка + световое пятно */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.20]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-56 right-0 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* ЕДИНАЯ СЕТКА ТЁМНЫХ БЛОКОВ */}
        <div className="relative w-full px-6">
          <div className="mx-auto max-w-6xl py-10 md:py-8">


            {/* заголовок */}
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Оптимальные решения
            </h1>

            {/* подзаголовок */}
 <div className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
  <p>
    Подбираем и компонуем оборудование разных производителей под технические требования
    заказчика с учётом:
  </p>

  {/* список “под двоеточием” */}
  <ul className="mt-3 space-y-2 pl-6 md:pl-8">
    {["цены", "сроков", "рисков"].map((item) => (
      <li key={item} className="flex items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>
            

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contacts"
                className="rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-400"
              >
                Описать задачу
              </a>
              <a
                href="/services"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm text-white/90 hover:border-white/25 hover:bg-white/5"
              >
                Посмотреть услуги
              </a>
            </div>

            {/* 3 карточки */}
            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white">Подбор и аналоги</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Помогаем подобрать эквиваленты и оптимизировать спецификацию.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white">Документация</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Паспорта, сертификаты, протоколы — по запросу.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold text-white">Сроки и поставка</div>
                <div className="mt-2 text-sm text-zinc-400">
                  Согласовываем сроки и держим коммуникацию на каждом шаге.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция на светлом фоне (контраст и “дороговизна”) */}
      <section id="role" className="bg-white text-zinc-900">
        {/* full width фон остаётся, но контент по сетке */}
        <div className="w-full px-6">
          <div className="mx-auto max-w-6xl py-16 md:py-20">
            <h2 className="text-2xl font-semibold md:text-3xl">Зоны ответственности</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Подбор по ТЗ",
                  desc: "Разберём спецификацию, предложим варианты и сформируем согласуемую спецификацию.",
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
        </div>
      </section>

{/* Снова тёмная секция: процесс */}
<section id="process" className="relative overflow-hidden border-t border-white/10">
{/* фон: мягкое световое пятно (зеркально hero, справа налево) */}
{/* фон: световое пятно + мягкая сетка (чтобы не было "провала") */}

<div className="pointer-events-none absolute inset-0">
  {/* очень слабая сетка */}
  <div
    className="absolute inset-0 opacity-[0.06]"
    style={{
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
      backgroundSize: "72px 72px",
    }}
  />
<div className="absolute -top-56 left-[-220px] h-[720px] w-[720px] rounded-full bg-white/6 blur-3xl" />
  {/* пятно справа (сильнее) */}
  <div className="absolute -top-44 right-[-220px] h-[720px] w-[720px] rounded-full bg-blue-500/18 blur-3xl" />
  {/* второе пятно снизу слева, чтобы не уходило в черноту к футеру */}
  <div className="absolute -bottom-80 left-[-160px] h-[620px] w-[620px] rounded-full bg-white/8 blur-3xl" />

  {/* общий затемняющий градиент справа->налево (менее жёсткий) */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c]/25 via-[#0b0b0c]/35 to-[#0b0b0c]/55" />
</div>
  <div className="w-full px-6">
    <div className="mx-auto max-w-6xl py-16 md:py-20">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">
        Как мы работаем
      </h2>

      {/* ОБЩИЙ КОНТЕЙНЕР С ЕДИНОЙ ГРАНИЦЕЙ */}
      <div className="mt-10">
        {/* Верхний ряд — 4 шага */}
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              n: "01",
              t: "Запрос",
              d: "Вы присылаете ТЗ / спецификацию / описание задачи.",
            },
            {
              n: "02",
              t: "Анализ",
              d: "Уточняем требования и ограничения, предлагаем варианты.",
            },
            {
              n: "03",
              t: "Спецификация",
              d: "Фиксируем состав решения, сроки, документы и условия.",
            },
            {
              n: "04",
              t: "Поставка",
              d: "Отгрузка и сопровождение до закрывающих.",
            },
          ].map((x) => (
            <div
              key={x.n}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <div className="text-xs text-zinc-400">{x.n}</div>
              <div className="mt-2 text-base font-semibold text-white">
                {x.t}
              </div>
              <div className="mt-2 text-sm text-zinc-400">{x.d}</div>
            </div>
          ))}
        </div>

        {/* Нижний ряд — 2 смысловых блока (В ТОЙ ЖЕ РАМКЕ) */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-base font-semibold text-white">
              Наша роль в проекте
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              Мы берём на себя формирование технико-коммерческого решения
              и ответственность за подбор оборудования.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-base font-semibold text-white">
              Вам не нужно разбираться в деталях
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              Мы учитываем требования, ограничения, сроки и риски —
              и предлагаем согласуемое решение.
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
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#0b0b0c]" />
      {/* КОНЕЦ ОБЩЕГО КОНТЕЙНЕРА */}
    </div>
  </div>
</section>
    </>
  );
}