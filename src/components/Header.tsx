import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBackgroundIntensity } from "@/contexts/BackgroundIntensityContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useComfortReading } from "@/contexts/ComfortReadingContext";

const nav: { to: string; label: string; emoji: string }[] = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/safety", label: "Safety", emoji: "🛡️" },
  { to: "/browse", label: "Browse Questions", emoji: "📋" },
  { to: "/ask", label: "Ask a Question", emoji: "✏️" },
  { to: "/scam-checker", label: "Scam Checker", emoji: "🔍" },
];

const linkClass = (active: boolean) =>
  `rounded-lg px-3 py-2 text-base font-medium leading-[1.75] transition-colors duration-200 min-h-[2.5rem] inline-flex items-center gap-1.5 ${
    active
      ? "bg-[#1D9E75] text-white"
      : "text-[#2C2C2A] hover:bg-[#F0EFEA]"
  }`;

const mobileLinkClass = (active: boolean) =>
  `flex items-center gap-2 py-3 text-lg font-medium leading-[1.75] ${
    active ? "text-[#1D9E75]" : "text-[#2C2C2A]"
  }`;

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { largeText, toggleLargeText } = useComfortReading();
  const { intensity, toggleIntensity } = useBackgroundIntensity();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E7E0] bg-white">
      <div className="relative mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 md:h-auto md:min-h-[64px] md:px-6 md:py-3">
        <Link
          to="/"
          className="relative z-10 shrink-0 text-xl font-medium text-[#1D9E75] transition-opacity duration-200 hover:opacity-90"
        >
          💬 SilverLink
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 z-0 hidden max-w-[min(100%,40rem)] -translate-x-1/2 -translate-y-1/2 flex-wrap items-center justify-center gap-1.5 md:flex md:gap-2"
          aria-label="Main"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkClass(location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to + "/")))}
            >
              <span aria-hidden>{item.emoji}</span>
              <span className="max-w-[8rem] truncate sm:max-w-none">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="relative z-10 hidden flex-wrap items-center justify-end gap-1.5 md:flex md:max-w-[11rem] lg:max-w-none">
          <Button
            type="button"
            variant="ghost"
            onClick={toggleLargeText}
            className="min-h-11 min-w-0 gap-1.5 px-2 text-base font-medium text-[#2C2C2A] hover:bg-[#F0EFEA] touch-manipulation"
            title={largeText ? "Use normal text size" : "Larger, easier to read text"}
            aria-pressed={largeText}
          >
            <span className="text-lg font-bold" aria-hidden>
              {largeText ? "A" : "A+"}
            </span>
            <span className="hidden sm:inline">
              {largeText ? "Normal" : "Larger text"}
            </span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={toggleIntensity}
            className="min-h-11 gap-1.5 px-2 text-base font-medium text-[#2C2C2A] hover:bg-[#F0EFEA]"
            title="Background: calm (soft) or vivid (brighter)"
            aria-pressed={intensity === "intense"}
          >
            <span aria-hidden>{intensity === "calm" ? "🥗" : "🔥"}</span>
            <span className="hidden lg:inline">
              {intensity === "calm" ? "Calm" : "Vivid"}
            </span>
          </Button>
          <Link
            to="/auth"
            className="inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-lg px-2 py-2 text-base font-medium text-[#2C2C2A] transition-colors duration-200 hover:bg-[#F0EFEA]"
          >
            <span aria-hidden>🔑</span>
            {user ? "Account" : "Sign In"}
          </Link>
          <Button
            asChild
            className="h-auto rounded-lg border-0 bg-[#1D9E75] px-4 py-2 text-base font-medium text-white transition-colors duration-200 hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
          >
            <Link to="/auth" className="inline-flex items-center gap-1.5">
              <span aria-hidden>👋</span>
              Join Free
            </Link>
          </Button>
        </div>

        <div className="relative z-10 flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="ghost"
            className="h-12 min-w-0 shrink px-2 text-[#2C2C2A] hover:bg-[#F0EFEA] rounded-lg"
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

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-[60px] items-center justify-between border-b border-[#E8E7E0] px-4">
            <span className="text-xl font-medium text-[#1D9E75]">💬 SilverLink</span>
            <Button
              type="button"
              variant="ghost"
              className="h-12 w-12 p-0 text-[#2C2C2A] hover:bg-[#F0EFEA] rounded-lg"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span className="inline-flex items-center gap-2">
                <X className="h-6 w-6" aria-hidden />
                <span className="text-base font-medium">Close</span>
              </span>
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-8">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClass(
                    location.pathname === item.to ||
                      (item.to !== "/" && location.pathname.startsWith(item.to + "/"))
                  )}
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
