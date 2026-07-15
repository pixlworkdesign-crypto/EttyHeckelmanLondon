import Link from "next/link";

const COLUMNS = [
  {
    heading: "Jewellery",
    links: [
      { label: "Engagement Rings", href: "/collections/rings" },
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Bracelets", href: "/collections/bracelets" },
    ],
  },
  {
    heading: "The House",
    links: [
      { label: "Bespoke Commissions", href: "/bespoke" },
      { label: "Book an Appointment", href: "/appointments" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Client Care",
    links: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Jewellery Care", href: "/jewellery-care" },
      { label: "Ring Size Guide", href: "/size-guide" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-porcelain mt-24">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow text-champagne">The House of Etty Hekelman</p>
            <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
              Join our private client list
            </h2>
            <p className="text-porcelain/60 mt-3 max-w-md text-sm font-light">
              Early access to new collections, private viewings and the stories behind our
              pieces — delivered with discretion.
            </p>
          </div>
          <form className="flex items-end gap-4 w-full max-w-md md:justify-self-end" aria-label="Newsletter sign up">
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent border-b border-white/25 py-3 text-sm placeholder:text-porcelain/40 focus:outline-none focus:border-champagne transition-colors"
              />
            </label>
            <button type="submit" className="btn btn-outline border-white/40 text-porcelain hover:bg-porcelain hover:text-ink">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-2xl tracking-[0.14em]">ETTY HEKELMAN</span>
          <p className="eyebrow text-champagne mt-1">London</p>
          <p className="text-porcelain/55 text-sm font-light mt-5 max-w-xs">
            Fine jewellery, handcrafted with care. Each piece is made to be treasured and
            passed on.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h3 className="eyebrow text-porcelain/70 mb-5">{col.heading}</h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-porcelain/70 hover:text-champagne transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.7rem] tracking-[0.12em] uppercase text-porcelain/45">
          <p>© {new Date().getFullYear()} Etty Hekelman London. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-porcelain transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-porcelain transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-porcelain transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
