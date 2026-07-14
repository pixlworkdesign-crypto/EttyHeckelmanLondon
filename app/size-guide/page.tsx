import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Ring Size Guide",
  description:
    "Find your ring size with the Etty Hekelman London guide, or book a complimentary sizing appointment.",
};

const SIZES = [
  { uk: "H", eu: "47", us: "4", mm: "46.8" },
  { uk: "J", eu: "48½", us: "4¾", mm: "48.0" },
  { uk: "L", eu: "51", us: "5¾", mm: "51.2" },
  { uk: "N", eu: "54", us: "6¾", mm: "53.8" },
  { uk: "P", eu: "56", us: "7½", mm: "56.3" },
  { uk: "R", eu: "58½", us: "8½", mm: "58.9" },
  { uk: "T", eu: "61", us: "9½", mm: "61.4" },
];

export default function SizeGuidePage() {
  return (
    <ContentPage
      overline="Client Care"
      title="Ring Size Guide"
      intro="A perfect fit matters. Use the guide below, or let us measure you in person during a complimentary appointment."
    >
      <h2>How to Measure at Home</h2>
      <ul>
        <li>Wrap a thin strip of paper or string snugly around the base of your finger.</li>
        <li>Mark where it overlaps, then measure the length in millimetres — this is your circumference.</li>
        <li>Match your measurement to the table below. If you are between sizes, choose the larger.</li>
        <li>Measure at the end of the day, when fingers are at their largest, and avoid cold hands.</li>
      </ul>

      <h2>Size Conversion</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-line text-ink">
              <th className="py-3 pr-4 font-normal uppercase tracking-[0.12em] text-[0.7rem]">UK</th>
              <th className="py-3 pr-4 font-normal uppercase tracking-[0.12em] text-[0.7rem]">Europe</th>
              <th className="py-3 pr-4 font-normal uppercase tracking-[0.12em] text-[0.7rem]">US</th>
              <th className="py-3 font-normal uppercase tracking-[0.12em] text-[0.7rem]">Circumference (mm)</th>
            </tr>
          </thead>
          <tbody className="text-ash">
            {SIZES.map((s) => (
              <tr key={s.uk} className="border-b border-line/60">
                <td className="py-3 pr-4 text-ink">{s.uk}</td>
                <td className="py-3 pr-4">{s.eu}</td>
                <td className="py-3 pr-4">{s.us}</td>
                <td className="py-3">{s.mm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Prefer to Be Measured?</h2>
      <p>
        The most reliable way to find your size is with us. Book a complimentary sizing appointment
        at our London showroom, and we will ensure a flawless fit. All of our rings can also be
        resized as part of our lifetime aftercare. <a href="/contact">Get in touch</a> to arrange.
      </p>
    </ContentPage>
  );
}
