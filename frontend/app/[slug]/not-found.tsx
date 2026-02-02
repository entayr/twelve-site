export default function NotFound() {
  return (
    <main className="w-full px-6 py-16">
      <h1 className="text-3xl font-semibold text-white">Страница не найдена</h1>
      <p className="mt-3 text-zinc-400">
        Проверь адрес или пункт меню в админке.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm text-white/90 hover:border-white/25 hover:bg-white/5"
      >
        На главную
      </a>
    </main>
  );
}
