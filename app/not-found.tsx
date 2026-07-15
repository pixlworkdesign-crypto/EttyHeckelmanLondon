import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="eyebrow text-champagne">Error 404</p>
      <h1 className="font-display text-6xl md:text-7xl mt-4">Page not found</h1>
      <p className="text-ash font-light mt-5 max-w-md">
        The page you are looking for may have been moved, or never existed. Let us guide you
        back to something beautiful.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-9">
        <Link href="/" className="btn btn-primary">Return Home</Link>
        <Link href="/collections" className="btn btn-outline">Browse Collections</Link>
      </div>
    </div>
  );
}
