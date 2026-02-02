import BlocksRenderer from "./BlocksRenderer";

export default function RichTextSection({ data }: { data: any }) {
  const body = data?.body || [];
  if (!Array.isArray(body) || body.length === 0) return null;

  return (
    <section className="w-full px-6 py-10">
      <div className="prose prose-invert max-w-none text-zinc-300">
        <BlocksRenderer blocks={body} />
      </div>
    </section>
  );
}
