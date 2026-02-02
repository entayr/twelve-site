type MapSectionData = {
  __component?: string;
  title?: string | null;

  // как у тебя в Strapi сейчас
  yandexMapUrl?: string | null;
  height?: number | null;

  // fallback (если вдруг где-то останутся координаты)
  latitude?: number | string | null;
  longitude?: number | string | null;
  zoom?: number | null;
};

function toNum(v: any): number | null {
  if (v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function buildYandexSrcFromCoords(lat: number, lng: number, zoom: number) {
  const ll = `${lng},${lat}`;
  const params = new URLSearchParams({
    ll,
    z: String(zoom),
    pt: `${lng},${lat},pm2rdm`,
  });
  return `https://yandex.ru/map-widget/v1/?${params.toString()}`;
}

export default function MapSection({ data }: { data: MapSectionData }) {
  if (!data) return null;

  const title = data.title || "Как нас найти";
  const height = typeof data.height === "number" ? data.height : 360;

  const url = (data.yandexMapUrl || "").trim();

  const lat = toNum(data.latitude);
  const lng = toNum(data.longitude);
  const zoom = typeof data.zoom === "number" ? data.zoom : 14;

  const src = url
    ? url
    : lat !== null && lng !== null
      ? buildYandexSrcFromCoords(lat, lng, zoom)
      : "";

  if (!src) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/10">
        <iframe
          title="map"
          src={src}
          style={{ height }}
          className="w-full"
          frameBorder="0"
          allowFullScreen
        />
      </div>

      <div className="mt-2 text-xs text-zinc-500">Карта: Яндекс</div>
    </section>
  );
}
