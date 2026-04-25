import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { checkMessageScamLevel, getScamResultMeta } from "@/lib/scamMessageChecker";
import type { ScamCheckResult } from "@/types/silverlink";
import {
  getScamCheckHistory,
  addScamCheckToHistory,
  clearScamCheckHistory,
  type ScamCheckHistoryItem,
} from "@/lib/scam-check-history";
import { format } from "date-fns";

const HEADING: Record<ScamCheckResult, string> = {
  likely_scam: "LIKELY SCAM",
  suspicious: "SUSPICIOUS",
  looks_safe: "LOOKS SAFE",
};

const RESULT_SHORT: Record<ScamCheckHistoryItem["result"], string> = {
  likely_scam: "High risk",
  suspicious: "Caution",
  looks_safe: "No flags",
};

const ScamChecker = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<ScamCheckResult | null>(null);
  const [history, setHistory] = useState<ScamCheckHistoryItem[]>(() => getScamCheckHistory());

  const refresh = useCallback(() => setHistory(getScamCheckHistory()), []);

  const runCheck = () => {
    const r = checkMessageScamLevel(text);
    setResult(r);
    setHistory(addScamCheckToHistory(text, r));
  };

  const meta = result ? getScamResultMeta(result) : null;

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-3 text-3xl font-medium text-[#2C2C2A]">🛡️ Is this message a scam?</h1>
        <p className="mb-8 text-lg leading-[1.75] text-[#5F5E5A]">
          📧 Paste a suspicious text, email, or message below and we will tell you if it looks safe.
        </p>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full message here…"
          rows={10}
          className="mb-4 min-h-[12rem] rounded-xl border border-[#E8E7E0] bg-white p-4 text-base leading-[1.75] focus-visible:ring-[#1D9E75]/30"
        />

        <div className="mb-6 min-h-11">
          <label className="inline-flex min-h-11 min-w-0 cursor-pointer items-center gap-2 text-base font-medium text-[#1D9E75]">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                setFileName(f ? f.name : null);
              }}
            />
            <span>Add a screenshot (optional)</span>
          </label>
          {fileName && <p className="mt-2 text-sm text-[#5F5E5A]">Selected: {fileName}</p>}
        </div>

        <Button
          type="button"
          onClick={runCheck}
          className="mb-4 min-h-11 touch-manipulation gap-2 rounded-lg bg-[#1D9E75] px-6 text-base font-medium text-white shadow-none hover:bg-[#1a8f68]"
        >
          <span aria-hidden>🔎</span> Check this message
        </Button>

        {history.length > 0 && (
          <div className="no-print mb-8 rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-medium text-[#2C2C2A]">🕐 Your recent checks (this device)</h2>
              <Button
                type="button"
                variant="ghost"
                className="min-h-9 text-sm"
                onClick={() => {
                  clearScamCheckHistory();
                  refresh();
                }}
              >
                Clear list
              </Button>
            </div>
            <ul className="space-y-2 text-sm text-[#5F5E5A]">
              {history.map((h) => (
                <li key={h.id} className="border-b border-[#E8E7E0] py-1 last:border-0">
                  <span className="font-medium text-[#2C2C2A]">[{RESULT_SHORT[h.result]}]</span>{" "}
                  {h.preview} — {format(new Date(h.at), "d MMM, HH:mm")}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result && meta && (
          <div className="space-y-4">
            <div
              className={`rounded-xl p-6 text-left ${meta.cardClass}`}
              role="status"
              aria-live="polite"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#5F5E5A]">
                {HEADING[result]}
              </p>
              <p className="text-base font-medium leading-[1.75] text-[#2C2C2A]">{meta.body}</p>
            </div>
            <p className="text-base leading-[1.75] text-[#5F5E5A]">
              Want a second opinion?{" "}
              <Link
                to="/browse?category=Scams%20%26%20Safety"
                className="font-medium text-[#1D9E75] underline-offset-2 hover:underline"
              >
                Post this in our Scams &amp; Safety forum
              </Link>{" "}
              and our community will take a look.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ScamChecker;
