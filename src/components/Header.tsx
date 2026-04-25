import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Questions" },
  { to: "/ask", label: "Ask a Question" },
  { to: "/scam-checker", label: "Scam Checker" },
];

const linkClass = (active: boolean) =>
  `rounded-lg px-3 py-2 text-base font-medium leading-[1.75] transition-colors duration-200 min-h-[2.5rem] inline-flex items-center ${
    active
      ? "bg-[#1D9E75] text-white"
      : "text-[#2C2C2A] hover:bg-[#F0EFEA]"
  }`;

const mobileLinkClass = (active: boolean) =>
  `block w-full py-3 text-lg font-medium leading-[1.75] ${
    active ? "text-[#1D9E75]" : "text-[#2C2C2A]"
  }`;

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E7E0] bg-white">
      <div className="relative mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 md:h-auto md:min-h-[64px] md:px-6 md:py-3">
        <Link
          to="/"
          className="relative z-10 shrink-0 text-xl font-medium text-[#1D9E75] transition-opacity duration-200 hover:opacity-90"
        >
          SilverLink
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 z-0 hidden max-w-[min(100%,36rem)] -translate-x-1/2 -translate-y-1/2 flex-wrap items-center justify-center gap-2 md:flex md:gap-3"
          aria-label="Main"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={linkClass(location.pathname === item.to)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-10 hidden items-center gap-2 md:flex">
          <Link
            to="/auth"
            className="rounded-lg px-3 py-2 text-base font-medium text-[#2C2C2A] transition-colors duration-200 hover:bg-[#F0EFEA] min-h-[2.5rem] inline-flex items-center"
          >
            {user ? "Account" : "Sign In"}
          </Link>
          <Button
            asChild
            className="h-auto rounded-lg border-0 bg-[#1D9E75] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
          >
            <Link to="/auth">Join Free</Link>
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
            <span className="text-xl font-medium text-[#1D9E75]">SilverLink</span>
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
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClass(location.pathname === item.to)}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-10 flex flex-col gap-3 border-t border-[#E8E7E0] pt-8">
              <Link
                to="/auth"
                className="text-lg font-medium text-[#2C2C2A]"
                onClick={() => setOpen(false)}
              >
                {user ? "Account" : "Sign In"}
              </Link>
              <Button
                asChild
                className="h-auto w-full justify-center rounded-lg bg-[#1D9E75] py-3 text-lg font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
              >
                <Link to="/auth" onClick={() => setOpen(false)}>
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
