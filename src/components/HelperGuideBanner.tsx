import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE = "silverlink-helper-guide-v1";

const LINES = [
  "We are here to help — never to judge. No question is too small.",
  "Take your time. If you share a link, say where you found it; we can check if it is safe.",
  "Verified helpers have been with us a while, but any friendly reply from the community is welcome.",
];

export function HelperGuideBanner() {
  const { pathname } = useLocation();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  const show =
    !dismissed &&
    (pathname.startsWith("/thread/") ||
      pathname === "/browse" ||
      pathname === "/ask" ||
      pathname === "/scam-checker");

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  };

  return (
    <div className="no-print border-b border-[#D4ECDF] bg-[#F0FAF5]">
      <div className="mx-auto flex max-w-4xl items-start gap-3 px-4 py-4 md:px-6">
        <div className="min-w-0 flex-1" role="status">
          <p className="mb-1 text-sm font-medium text-[#0F5C44]">🤝 Helping in this community</p>
          <ul className="list-inside list-disc space-y-1 text-base leading-relaxed text-[#2C2C2A]">
            {LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11 shrink-0"
          onClick={dismiss}
          aria-label="Dismiss guide"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
