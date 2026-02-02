type Block = {
  type: string;
  children?: Block[];
  text?: string;
};

function renderText(node: Block, key: number) {
  return <span key={key}>{node.text}</span>;
}

export default function BlocksRenderer({ blocks }: { blocks: Block[] }) {
  if (!Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mb-4 text-zinc-300">
                {block.children?.map(renderText)}
              </p>
            );

          case "heading":
            return (
              <h2 key={i} className="mb-4 mt-8 text-2xl font-semibold text-white">
                {block.children?.map(renderText)}
              </h2>
            );

          case "list":
            return (
              <ul key={i} className="mb-4 list-disc pl-6 text-zinc-300">
                {block.children?.map((li, j) => (
                  <li key={j}>{li.children?.map(renderText)}</li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
