import { Link } from "react-router-dom";

const links = [
  { to: "/safety", label: "🛡️ Safety & trust" },
  { to: "/#about", label: "ℹ️ About" },
  { to: "/#contact", label: "📧 Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[#E8E7E0] bg-[#F8F8F6]">
      <div className="mx-auto max-w-[680px] px-4 py-10 text-center md:px-6 md:py-16">
        <nav
          className="mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-base font-medium text-[#5F5E5A]"
          aria-label="Footer"
        >
          {links.map((l, i) => (
            <span key={l.to} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-[#C8C6BE]" aria-hidden>·</span>}
              <Link
                to={l.to}
                className="text-[#1D9E75] transition-colors duration-200 hover:underline"
              >
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
        <p className="text-base font-medium leading-[1.75] text-[#2C2C2A]">
          💬 SilverLink — Simple help. Real people. Safe answers.
        </p>
        <p className="no-print mt-4 text-sm text-[#5F5E5A]">
          <a
            href={`${import.meta.env.BASE_URL}rss.xml`}
            className="font-medium text-[#1D9E75] hover:underline"
          >
            RSS — recent questions
          </a>{" "}
          for news readers
        </p>
      </div>
    </footer>
  );
}
