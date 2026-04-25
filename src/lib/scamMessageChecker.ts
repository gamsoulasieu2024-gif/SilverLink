import type { ScamCheckResult } from "@/types/silverlink";

const RED_FLAGS = [
  "urgent",
  "act now",
  "click here",
  "verify your account",
  "suspended",
  "unusual activity",
  "prize",
  "won",
  "claim your",
  "bank details",
  "confirm your details",
  "free gift",
  "limited time",
  "your account has been",
  "immediate action",
  "call this number",
  "microsoft",
  "hmrc",
  "tax refund",
  "delivery failed",
  "parcel",
  "update your payment",
] as const;

function countRedFlags(text: string): number {
  const lower = text.toLowerCase();
  let n = 0;
  for (const flag of RED_FLAGS) {
    if (lower.includes(flag)) n += 1;
  }
  return n;
}

export function checkMessageScamLevel(text: string): ScamCheckResult {
  const count = countRedFlags(text.trim());
  if (count >= 2) return "likely_scam";
  if (count === 1) return "suspicious";
  return "looks_safe";
}

export function getScamResultMeta(result: ScamCheckResult): {
  title: string;
  body: string;
  cardClass: string;
} {
  switch (result) {
    case "likely_scam":
      return {
        title: "Likely scam",
        body: "This message has several signs of a scam. Do not click any links, do not call any numbers, and do not provide any personal information. Delete the message.",
        cardClass: "border border-[#E8B4B4] bg-[#FDF5F5] text-[#2C2C2A]",
      };
    case "suspicious":
      return {
        title: "Suspicious",
        body: "This message has one or more warning signs. Be cautious. If it claims to be from your bank or a government service, contact them directly using the official number — not the one in this message.",
        cardClass: "border border-[#E8D4A8] bg-[#FFFBF3] text-[#2C2C2A]",
      };
    default:
      return {
        title: "Looks safe",
        body: "We did not detect common scam phrases in this message. However, always use your judgement — if something feels wrong, trust that feeling.",
        cardClass: "border border-[#B8E0D0] bg-[#F4FBF8] text-[#2C2C2A]",
      };
  }
}
