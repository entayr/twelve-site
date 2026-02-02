import { notFound } from "next/navigation";

import BlocksRenderer from "../components/BlocksRenderer";
import HeroSection from "../components/HeroSection";
import RichTextSection from "../components/RichTextSection";
import FeaturesSection from "../components/FeaturesSection";
import MapSection from "../components/MapSection";
import CtaSection from "../components/CtaSection";

import { fetchGlobal, fetchPageBySlug } from "../lib/strapi";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [global, page] = await Promise.all([fetchGlobal(), fetchPageBySlug(slug)]);

  const companyName = global?.company_name || 'ООО "ДВЕНАДЦАТЬ"';

  if (!page) {
    return {
      title: `${companyName}`,
      description:
        "Поставки промышленного и взрывозащищённого электрооборудования для предприятий",
    };
  }

  const title = page.seo_title || page.title || companyName;
  const description =
    page.seo_description ||
    "Поставки промышленного и взрывозащищённого электрооборудования для предприятий";

  return { title, description };
}

function renderSection(s: any) {
  if (!s?.__component) return null;

  switch (s.__component) {
    case "shared.sections-hero":
      return <HeroSection key={`${s.__component}-${s.id}`} data={s} />;

    case "shared.sections-rich-text":
      return <RichTextSection key={`${s.__component}-${s.id}`} data={s} />;

    case "shared.sections-features":
      return <FeaturesSection key={`${s.__component}-${s.id}`} data={s} />;

    case "shared.sections-map":
      return <MapSection key={`${s.__component}-${s.id}`} data={s} />;

    case "shared.sections-cta":
      return <CtaSection key={`${s.__component}-${s.id}`} data={s} />;

    default:
      return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);

  if (!page) notFound();


  
  const sections: any[] = Array.isArray((page as any)?.sections) ? (page as any).sections : [];
  const hasSections = sections.length > 0;


  
  return (
    <main className="mx-auto max-w-7xl px-6 py-6 md:py-8">
      {hasSections ? (
        <>{sections.map(renderSection)}</>
      ) : (
        <>
          <h1 className="text-3xl font-semibold tracking-tight text-white">{page.title}</h1>

          <div className="prose prose-invert mt-6 max-w-none">
            <BlocksRenderer blocks={(page as any).content || []} />
          </div>
        </>
      )}
    </main>
  );
}
