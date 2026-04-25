import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocalThreadsContext } from "@/contexts/LocalThreadsContext";
import { CATEGORY_ORDER } from "@/lib/silverlink-data";
import { cn } from "@/lib/utils";

const MIN_CHARS = 20;

const AskQuestion = () => {
  const { addUserQuestion } = useLocalThreadsContext();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string>("");
  const [questionText, setQuestionText] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screenshotName, setScreenshotName] = useState<string | null>(null);

  const len = questionText.trim().length;
  const canAdvance2 = len >= MIN_CHARS;

  const handlePost = () => {
    setLoading(true);
    addUserQuestion(category, questionText.trim());
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center bg-white px-4 py-16 text-center md:px-6">
        <div className="mx-auto max-w-[680px] rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-8 md:p-10">
          <h1 className="mb-4 text-2xl font-medium text-[#2C2C2A]">Your question has been posted</h1>
          <p className="mb-8 text-base leading-[1.75] text-[#5F5E5A]">
            We will notify you when someone replies.
          </p>
          <Button
            asChild
            className="h-auto rounded-lg bg-[#1D9E75] px-6 py-3 text-base font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
          >
            <Link to="/browse">Back to all questions</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white px-4 py-10 text-[#2C2C2A] md:px-6 md:py-16">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-3xl font-medium text-center text-[#2C2C2A]">Ask a question</h1>
        <p className="mb-8 text-center text-base text-[#5F5E5A]">Three quick steps</p>

        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-base font-medium transition-colors duration-200",
                step >= s ? "bg-[#1D9E75] text-white" : "bg-[#E8E7E0] text-[#5F5E5A]"
              )}
            >
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="mb-4 text-lg font-medium">Choose a category</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1">
              {CATEGORY_ORDER.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "w-full min-h-[3.5rem] rounded-xl border px-4 py-3 text-left text-base font-medium transition-colors duration-200",
                    category === c
                      ? "border-[#1D9E75] bg-[#E3F5EC] text-[#0F5C44]"
                      : "border-[#E8E7E0] bg-white text-[#2C2C2A] hover:border-[#1D9E75]/40"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <Button
              type="button"
              className="mt-6 h-auto w-full rounded-lg bg-[#1D9E75] py-3 text-base font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
              disabled={!category}
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <Label htmlFor="q" className="mb-2 block text-lg font-medium text-[#2C2C2A]">
              Write your question
            </Label>
            <Textarea
              id="q"
              rows={8}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder='Describe what is happening in your own words. Don’t worry about using the right technical terms — just tell us what you see.'
              className="mb-3 min-h-[12rem] rounded-xl border border-[#E8E7E0] bg-white p-4 text-base leading-[1.75] text-[#2C2C2A] placeholder:text-[#5F5E5A] focus-visible:ring-[#1D9E75]/30"
            />
            <div className="mb-4 flex min-h-[2.5rem] flex-wrap items-center justify-between gap-2 text-sm text-[#5F5E5A]">
              <span>
                {len} / {MIN_CHARS} characters minimum
              </span>
              {len < MIN_CHARS && len > 0 && (
                <span className="text-[#BA7517]">A little more detail will help us help you</span>
              )}
            </div>
            <div className="mb-6 min-h-[2.5rem]">
              <label className="inline-flex cursor-pointer items-center gap-2 text-base font-medium text-[#1D9E75]">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setScreenshotName(f ? f.name : null);
                  }}
                />
                <span>Upload a screenshot (optional)</span>
              </label>
              {screenshotName && (
                <p className="mt-2 text-sm text-[#5F5E5A]">Selected: {screenshotName}</p>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="h-auto flex-1 rounded-lg border border-[#E8E7E0] py-3 text-base font-medium min-h-[2.5rem] shadow-none"
              >
                Back
              </Button>
              <Button
                type="button"
                className="h-auto flex-1 rounded-lg bg-[#1D9E75] py-3 text-base font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
                disabled={!canAdvance2}
                onClick={() => setStep(3)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4 text-lg font-medium">Review and post</h2>
            <div className="mb-3 rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-4">
              <p className="text-sm font-medium text-[#5F5E5A]">Category</p>
              <p className="text-base text-[#2C2C2A]">{category}</p>
            </div>
            <div className="mb-6 rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-4">
              <p className="text-sm font-medium text-[#5F5E5A]">Your question</p>
              <p className="whitespace-pre-wrap text-base leading-[1.75] text-[#2C2C2A]">
                {questionText.trim()}
              </p>
            </div>
            <p className="mb-4 text-sm leading-[1.75] text-[#5F5E5A]">
              Your question will be reviewed and answered by our community, usually within a few hours.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(2)}
                className="h-auto flex-1 rounded-lg border border-[#E8E7E0] py-3 text-base font-medium min-h-[2.5rem] shadow-none"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handlePost}
                disabled={loading}
                className="h-auto flex-1 rounded-lg bg-[#1D9E75] py-3 text-base font-medium text-white hover:bg-[#1a8f68] min-h-[2.5rem] shadow-none"
              >
                {loading ? "Posting…" : "Post my question"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AskQuestion;
