import Link from "next/link";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function CtaSection({ data }: { data: any }) {
  const title = data?.title;
  const text = data?.text;
  const label = data?.ctaLabel;
  const href = data?.ctaUrl;

  if (!title && !text && !(label && href)) return null;

  return (
    <section className="w-full px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        {title ? (
          <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        ) : null}

        {text ? <p className="mt-3 text-zinc-300">{text}</p> : null}

        {label && href ? (
          <div className="mt-6">
            <SmartLink
              href={href}
              className="inline-flex rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-400"
            >
              {label}
            </SmartLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
