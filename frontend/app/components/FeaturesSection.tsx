export default function FeaturesSection({ data }: { data: any }) {
  const title = data?.title;
  if (!title) return null;

  return (
    <section className="w-full px-6 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      {/* позже добавим items/карточки, когда появятся поля */}
    </section>
  );
}
