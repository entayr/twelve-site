import BlocksRenderer from "./BlocksRenderer";

type HeroSectionData = {
  __component?: string;
  title?: string | null;
  subtitle?: any[] | null;
  primaryCtaLabel?: string | null;
  primaryCtaType?: string | null;
  primaryCtaUrl?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaType?: string | null;
  secondaryCtaUrl?: string | null;
};

export default function HeroSection({
  data,
  compact = false,
  noDivider = false,
}: {
  data: HeroSectionData;
  compact?: boolean;
  noDivider?: boolean;
}) {
  if (!data) return null;

  const title = data.title || "";
  const subtitle = data.subtitle || [];

  const padding = compact ? "pt-6 pb-8" : "pt-14 pb-12";

  return (
    <section
      className={[
        !noDivider && "border-b border-white/10",
        padding,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="w-full px-6 py-10 md:py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h1>

        {Array.isArray(subtitle) && subtitle.length ? (
          <div className="prose prose-invert mt-4 max-w-none text-zinc-300">
            <BlocksRenderer blocks={subtitle as any} />
          </div>
        ) : null}
      </div>
    </section>
  );
}