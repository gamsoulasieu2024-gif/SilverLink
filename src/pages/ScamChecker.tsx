import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { checkMessageScamLevel, getScamResultMeta } from "@/lib/scamMessageChecker";
import type { ScamCheckResult } from "@/types/silverlink";

const HEADING: Record<ScamCheckResult, string> = {
  likely_scam: "LIKELY SCAM",
  suspicious: "SUSPICIOUS",
  looks_safe: "LOOKS SAFE",
};

const ScamChecker = () => {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<ScamCheckResult | null>(null);

  const runCheck = () => {
    const r = checkMessageScamLevel(text);
    setResult(r);
  };

  const meta = result ? getScamResultMeta(result) : null;

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-[680px]">
        <h1 className="mb-3 text-3xl font-medium text-[#2C2C2A]">Is this message a scam?</h1>
        <p className="mb-8 text-lg leading-[1.75] text-[#5F5E5A]">
          Paste a suspicious text, email, or message below and we will tell you if it looks safe.
        </p>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full message here…"
          rows={10}
          className="mb-4 min-h-[12rem] rounded-xl border border-[#E8E7E0] bg-white p-4 text-base leading-[1.75] focus-visible:ring-[#1D9E75]/30"
        />

        <div className="mb-6 min-h-[2.5rem]">
          <label className="inline-flex cursor-pointer items-center gap-2 text-base font-medium text-[#1D9E75]">
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
          className="mb-8 h-auto rounded-lg bg-[#1D9E75] px-6 py-3 text-base font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
        >
          Check this message
        </Button>

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
