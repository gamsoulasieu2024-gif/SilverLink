import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitSafetyReport, type ReportKind } from "@/lib/safety-reports";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const REASONS = [
  { value: "scam", label: "Looks like a scam" },
  { value: "wrong", label: "Incorrect or unsafe advice" },
  { value: "rude", label: "Unkind or shaming" },
  { value: "other", label: "Something else" },
] as const;

type Props = {
  kind: ReportKind;
  threadId: string;
  answerId?: string;
  className?: string;
};

export function ReportContent({ kind, threadId, answerId, className }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"choose" | "note" | "done">("choose");
  const [reason, setReason] = useState<string>("");
  const [note, setNote] = useState("");

  const reset = () => {
    setOpen(false);
    setStep("choose");
    setReason("");
    setNote("");
  };

  const submit = () => {
    if (!reason) return;
    submitSafetyReport({ kind, threadId, answerId, reason, note: note.trim() });
    setStep("done");
    toast({
      title: "Thank you",
      description: "Your report is saved. We review every concern. On this device you can also see it under Safety.",
    });
    setTimeout(() => reset(), 2500);
  };

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setStep("choose");
          setReason("");
          setNote("");
          setOpen(true);
        }}
        className={cn(
          "min-h-11 touch-manipulation gap-2 border-[#E8E7E0] text-sm font-medium text-[#5F5E5A] shadow-none",
          className
        )}
      >
        <span aria-hidden>🚩</span> Report a concern
      </Button>
    );
  }

  if (step === "done") {
    return (
      <p className="rounded-xl border border-[#C8E6D6] bg-[#F4FBF8] p-3 text-sm font-medium text-[#1D5A45]">
        Report received. Thank you for helping keep SilverLink safe.
      </p>
    );
  }

  if (step === "note" && reason) {
    return (
      <div className="space-y-3 rounded-xl border border-[#E8E7E0] bg-[#F8F8F6] p-4">
        <p className="text-sm font-medium text-[#2C2C2A]">Anything more we should know? (optional)</p>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="text-base"
          placeholder="You can stay anonymous. No account needed."
        />
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => {
              setStep("choose");
              setReason("");
            }}
          >
            Back
          </Button>
          <Button type="button" className="min-h-11 bg-[#1D9E75] text-white" onClick={submit}>
            Submit report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-[#E8E7E0] bg-white p-4" role="region" aria-label="Report">
      <Label className="text-sm font-medium text-[#2C2C2A]">What is the concern?</Label>
      <div className="flex flex-wrap gap-2">
        {REASONS.map((r) => (
          <Button
            key={r.value}
            type="button"
            variant="outline"
            className="min-h-11"
            onClick={() => {
              setReason(r.value);
              setStep("note");
            }}
          >
            {r.label}
          </Button>
        ))}
        <Button type="button" variant="ghost" className="min-h-11" onClick={reset}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
