import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ReportDialogProps {
  replyId: string;
}

const REPORT_REASONS = [
  { value: "scam", label: "🚨 Scam" },
  { value: "wrong", label: "❌ Wrong advice" },
  { value: "rude", label: "😠 Rude" },
];

const ReportDialog = ({ replyId }: ReportDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReport = async (reason: string) => {
    if (!user) {
      toast({ title: "Please sign in to report", variant: "destructive" });
      return;
    }
    await supabase.from("reports").insert({
      reply_id: replyId,
      user_id: user.id,
      reason,
    });
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        🚩 Report a Problem
      </Button>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-xl border-2 border-safe bg-safe/10 p-4 animate-fade-in">
        <p className="text-lg font-bold text-foreground">
          ✅ Thank you! We will review this reply.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-border bg-card p-4 animate-fade-in">
      <p className="mb-3 text-lg font-bold text-foreground">What is wrong with this reply?</p>
      <div className="flex flex-wrap gap-3">
        {REPORT_REASONS.map((reason) => (
          <Button key={reason.value} variant="outline" onClick={() => handleReport(reason.value)}>
            {reason.label}
          </Button>
        ))}
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ReportDialog;
