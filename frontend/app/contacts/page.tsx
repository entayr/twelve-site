import HeroSection from "../components/HeroSection";
import MapSection from "../components/MapSection";
import ContactFormSection from "../components/ContactFormSection";
import BlocksRenderer from "../components/BlocksRenderer";
import { fetchPageBySlug, fetchGlobal } from "../lib/strapi";
import { notFound } from "next/navigation";

// ... imports

export default async function ContactsPage() {
  const page = await fetchPageBySlug("contacts");
  if (!page) notFound();

  const sections: any[] = Array.isArray((page as any)?.sections) ? (page as any).sections : [];

  const hero = sections.find((s: any) => s?.__component === "shared.sections-hero") || null;
  const rich = sections.find((s: any) => s?.__component === "shared.sections-rich-text") || null;
  const map = sections.find((s: any) => s?.__component === "shared.sections-map") || null;

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
      {hero ? <HeroSection data={hero} compact /> : null}

      <section className="pt-4 pb-10">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* слева: офис + карта (~60%) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-white/5 p-6">
              <div className="prose prose-invert max-w-none text-zinc-200">
                <BlocksRenderer blocks={(rich?.body || []) as any} />
              </div>
            </div>

            {map ? <MapSection data={map} /> : null}
          </div>

          {/* справа: форма (~40%) */}
          <div className="lg:col-span-5">
            <ContactFormSection />
          </div>
        </div>
      </section>
    </main>
  );
}