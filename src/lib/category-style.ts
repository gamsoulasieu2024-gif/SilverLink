import { cn } from "@/lib/utils";

const CATEGORY_PILL: Record<string, string> = {
  "Scams & Safety": "bg-[#F7E5E5] text-[#7A2E2E] border-[#E4C4C4]",
  "Passwords & Accounts": "bg-[#ECE8F4] text-[#4A3D6B] border-[#D8D0E8]",
  "Video Calls": "bg-[#E3F0FF] text-[#1A4A6E] border-[#C4DBF0]",
  "Apps & Phone Settings": "bg-[#E8F2EE] text-[#1D5A45] border-[#C0DDD2]",
  "Health & News": "bg-[#F5E8E8] text-[#6B3030] border-[#E4C8C8]",
};

export function categoryPillClass(category: string): string {
  return cn(
    "inline-flex items-center border px-3 py-1 text-xs font-medium",
    "rounded-full",
    CATEGORY_PILL[category] ?? "bg-[#F1F0EC] text-[#4A4945] border-[#E8E7E0]"
  );
}
