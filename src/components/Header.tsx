import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBackgroundIntensity } from "@/contexts/BackgroundIntensityContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useComfortReading } from "@/contexts/ComfortReadingContext";

const nav: { to: string; label: string; shortLabel: string; emoji: string }[] = [
  { to: "/", label: "Home", shortLabel: "Home", emoji: "🏠" },
  { to: "/safety", label: "Safety", shortLabel: "Safety", emoji: "🛡️" },
  { to: "/browse", label: "Browse Questions", shortLabel: "Browse", emoji: "📋" },
  { to: "/ask", label: "Ask a Question", shortLabel: "Ask", emoji: "✏️" },
  { to: "/scam-checker", label: "Scam Checker", shortLabel: "Scams", emoji: "🔍" },
];

const linkClass = (active: boolean) =>
  `shrink-0 rounded-lg px-2.5 py-2 text-sm font-medium leading-snug transition-colors duration-200 min-h-[2.5rem] inline-flex items-center gap-1.5 sm:px-3 sm:text-base ${
    active
      ? "bg-[#1D9E75] text-white"
      : "text-[#2C2C2A] hover:bg-[#F0EFEA]"
  }`;

const mobileLinkClass = (active: boolean) =>
  `flex items-center gap-2 py-3 text-lg font-medium leading-[1.75] ${
    active ? "text-[#1D9E75]" : "text-[#2C2C2A]"
  }`;

function isNavActive(
  pathname: string,
  to: string
): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { largeText, toggleLargeText } = useComfortReading();
  const { intensity, toggleIntensity } = useBackgroundIntensity();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E7E0] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-2 md:px-6 md:py-3">
        {/* Row 1: logo, utilities (desktop), hamburger (mobile) */}
        <div className="flex min-h-[3rem] items-center justify-between gap-2">
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 text-lg font-medium text-[#1D9E75] transition-opacity duration-200 hover:opacity-90 sm:gap-2.5 sm:text-xl"
          >
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
              decoding="async"
            />
            <span>SilverLink</span>
          </Link>

          <div className="hidden min-w-0 items-center justify-end gap-1 sm:gap-1.5 md:flex md:flex-nowrap">
            <Button
              type="button"
              variant="ghost"
              onClick={toggleLargeText}
              className="h-10 min-h-10 gap-1 px-2 text-sm font-medium text-[#2C2C2A] hover:bg-[#F0EFEA] sm:gap-1.5 sm:px-3 sm:text-base"
              title={largeText ? "Use normal text size" : "Larger, easier to read text"}
              aria-pressed={largeText}
            >
              <span className="text-base font-bold" aria-hidden>
                {largeText ? "A" : "A+"}
              </span>
              <span className="hidden max-w-[7rem] truncate lg:inline">
                {largeText ? "Normal" : "Larger text"}
              </span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={toggleIntensity}
              className="h-10 min-h-10 gap-1 px-2 text-sm font-medium text-[#2C2C2A] hover:bg-[#F0EFEA] sm:px-3 sm:text-base"
              title="Background: calm (soft) or vivid (brighter)"
              aria-pressed={intensity === "intense"}
            >
              <span aria-hidden>{intensity === "calm" ? "🥗" : "🔥"}</span>
              <span className="hidden xl:inline">
                {intensity === "calm" ? "Calm" : "Vivid"}
              </span>
            </Button>
            <Link
              to="/auth"
              className="inline-flex h-10 min-h-10 max-w-[5.5rem] items-center justify-center gap-1 truncate rounded-lg px-2 text-sm font-medium text-[#2C2C2A] transition-colors duration-200 hover:bg-[#F0EFEA] sm:max-w-none sm:px-3 sm:text-base"
            >
              <span aria-hidden>🔑</span>
              {user ? "Account" : "Sign In"}
            </Link>
            <Button
              asChild
              className="h-10 min-h-10 shrink-0 rounded-lg border-0 bg-[#1D9E75] px-3 text-sm font-medium text-white shadow-none hover:bg-[#1a8f68] sm:px-4 sm:text-base"
            >
              <Link to="/auth" className="inline-flex items-center justify-center gap-1">
                <span aria-hidden>👋</span>
                Join Free
              </Link>
            </Button>
          </div>

          <div className="flex md:hidden">
            <Button
              type="button"
              variant="ghost"
              className="h-11 min-w-0 px-2 text-[#2C2C2A] hover:bg-[#F0EFEA]"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <span className="inline-flex items-center gap-2">
                <Menu className="h-6 w-6 shrink-0" aria-hidden />
                <span className="text-base font-medium">Menu</span>
              </span>
            </Button>
          </div>
        </div>

        {/* Row 2: main nav (desktop & tablet) — own row so it never collides with controls */}
        <nav
          className="mt-0 hidden w-full min-w-0 border-t border-[#E8E7E0] pt-2.5 md:mt-2.5 md:block"
          aria-label="Main"
        >
          <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-1.5 p-0 sm:gap-2">
            {nav.map((item) => {
              const active = isNavActive(location.pathname, item.to);
              return (
                <li key={item.to} className="m-0 p-0">
                  <Link to={item.to} className={linkClass(active)}>
                    <span aria-hidden>{item.emoji}</span>
                    <span className="lg:hidden" title={item.label}>
                      {item.shortLabel}
                    </span>
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-[3.5rem] shrink-0 items-center justify-between border-b border-[#E8E7E0] px-4">
            <span className="inline-flex items-center gap-2 text-lg font-medium text-[#1D9E75] sm:gap-2.5 sm:text-xl">
              <img
                src={`${import.meta.env.BASE_URL}logo.svg`}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
                decoding="async"
              />
              <span>SilverLink</span>
            </span>
            <Button
              type="button"
              variant="ghost"
              className="h-11 px-2 text-[#2C2C2A] hover:bg-[#F0EFEA]"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span className="inline-flex items-center gap-2">
                <X className="h-6 w-6" aria-hidden />
                <span className="text-base font-medium">Close</span>
              </span>
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClass(isNavActive(location.pathname, item.to))}
                  onClick={() => setOpen(false)}
                >
                  <span className="text-2xl" aria-hidden>
                    {item.emoji}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-2 border-t border-[#E8E7E0] pt-6">
              <Button
                type="button"
                variant="ghost"
                className="h-auto min-h-11 w-full justify-start text-lg font-medium"
                onClick={() => {
                  toggleLargeText();
                }}
              >
                <span className="mr-2 text-xl font-bold" aria-hidden>
                  {largeText ? "A" : "A+"}
                </span>
                {largeText ? "Normal text size" : "Larger text"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-auto min-h-11 w-full justify-start text-lg font-medium"
                onClick={() => {
                  toggleIntensity();
                }}
              >
                <span className="mr-2" aria-hidden>
                  {intensity === "calm" ? "🥗" : "🔥"}
                </span>
                {intensity === "calm" ? "Calm background" : "Vivid background"}
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-[#E8E7E0] pt-6">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 text-lg font-medium text-[#2C2C2A]"
                onClick={() => setOpen(false)}
              >
                <span aria-hidden>🔑</span>
                {user ? "Account" : "Sign In"}
              </Link>
              <Button
                asChild
                className="h-auto w-full justify-center gap-2 rounded-lg bg-[#1D9E75] py-3 text-lg font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
              >
                <Link to="/auth" onClick={() => setOpen(false)} className="inline-flex items-center justify-center">
                  <span aria-hidden>👋</span>
                  Join Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
