import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import officialTips from "@data/official-tips.json";
import { categoryPillClass } from "@/lib/category-style";
import { cn } from "@/lib/utils";

type Tip = (typeof officialTips)[number];

export function OfficialTipsSection({ compact = false }: { compact?: boolean }) {
  const tips: Tip[] = compact ? (officialTips as Tip[]).slice(0, 2) : (officialTips as Tip[]);

  return (
    <section
      className={cn(
        "print-friendly border-b border-[#E8E7E0] bg-white px-4 py-10 md:px-6 md:py-16",
        compact && "py-8 md:py-10"
      )}
      aria-labelledby="official-tips-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-3xl" aria-hidden>
            📘
          </span>
          <BookOpen className="h-7 w-7 text-[#1D9E75]" aria-hidden />
          <h2 id="official-tips-heading" className="text-2xl font-medium text-[#2C2C2A]">
            Official safety tips
          </h2>
        </div>
        <p className="mb-6 max-w-[680px] text-base leading-[1.75] text-[#5F5E5A]">
          ✨ Short, trustworthy reminders from SilverLink. They do not replace community answers — they add a safety net
          everyone can read.
        </p>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tips.map((t) => (
            <li
              key={t.id}
              className="rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-5 md:min-h-[8rem] print:break-inside-avoid"
            >
              <div className="mb-2">
                <span className={categoryPillClass(t.category)}>{t.category}</span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-[#2C2C2A]">{t.title}</h3>
              <p className="text-base leading-[1.75] text-[#5F5E5A]">{t.body}</p>
            </li>
          ))}
        </ul>
        {compact && (
          <p className="mt-6 text-center">
            <Link
              to="/safety"
              className="text-base font-medium text-[#1D9E75] underline-offset-2 hover:underline"
            >
              All tips & your safety tools
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
