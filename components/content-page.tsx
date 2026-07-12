import Link from "next/link";

/**
 * Shared layout for long-form editorial pages (policies, care, guides).
 */
export function ContentPage({
  overline,
  title,
  intro,
  children,
}: {
  overline?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 md:px-8 py-16 md:py-24">
      <nav className="text-[0.68rem] uppercase tracking-[0.16em] text-ash mb-8">
        <Link href="/" className="hover:text-ink transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{title}</span>
      </nav>

      <header className="text-center mb-12 md:mb-16">
        {overline && <p className="overline">{overline}</p>}
        <h1 className="font-display text-4xl md:text-6xl mt-3 leading-[1.05]">{title}</h1>
        {intro && <p className="text-ash font-light mt-5 leading-relaxed">{intro}</p>}
        <div className="rule-motif mt-8">
          <span />
        </div>
      </header>

      <article className="prose-lux">{children}</article>

      <div className="mt-16 pt-10 border-t border-line text-center">
        <p className="text-ash font-light text-sm">
          Still have a question? Our team is here to help.
        </p>
        <Link href="/contact" className="btn btn-outline mt-5">
          Contact the House
        </Link>
      </div>
    </div>
  );
}
