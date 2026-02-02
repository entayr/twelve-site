export default function UsefulPage() {
  return (
    <>
      {/* HERO — светлый, с вертикальной линией */}
      <section className="bg-white">
  <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl border-l border-zinc-300 pl-6">
            <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">
              Когда мы полезны
            </h1>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              Мы подключаемся там, где стандартные поставки не решают задачу
              и требуется техническое мышление, ответственность и координация.
            </p>
          </div>
        </div>
      </section>

      {/* СИТУАЦИИ — основной смысловой блок */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="max-w-4xl border-l border-zinc-200 pl-6">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Мы полезны, если у вас:
            </h2>

            <ul className="mt-6 grid gap-4 md:grid-cols-2 text-zinc-700">
              <li>Есть ТЗ или спецификация, но нет уверенности в решении</li>
              <li>Нужно подобрать аналоги или заменить оборудование</li>
              <li>В проекте участвуют несколько производителей</li>
              <li>Критичны сроки и риски поставки</li>
              <li>Требуется документация и ответственность за результат</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ — мягкий переходный фон */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl border-l border-zinc-300 pl-6">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Почему в этих ситуациях мы эффективны
            </h2>

            <div className="mt-6 grid gap-4 text-zinc-700">
              <p>
                Мы берём на себя формирование технико-коммерческого решения,
                а не просто подбор отдельных позиций.
              </p>
              <p>
                Учитываем технику, сроки, риски и последствия закупки —
                не только цену.
              </p>
              <p>
                Работаем как технический партнёр и доводим задачу до результата.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* КОГДА МЫ НЕ ПОДХОДИМ — тёмный акцент */}
      <section className="bg-[#0b0b0c] border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-white">
              Когда мы не подходим
            </h2>

            <ul className="mt-6 grid gap-3 text-zinc-400">
              <li>Если важна только минимальная цена без учёта рисков</li>
              <li>Если требуется просто выставить счёт</li>
              <li>Если решение уже выбрано и не обсуждается</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA — снова белый */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl border-l border-zinc-300 pl-6">
            <p className="text-base text-zinc-700">
              Если вы узнали свою ситуацию — опишите вводные.
              Мы скажем, можем ли быть полезны и в каком формате.
            </p>

            <div className="mt-6">
              <a
                href="/contacts"
                className="inline-flex rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-400"
              >
                Описать задачу
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}