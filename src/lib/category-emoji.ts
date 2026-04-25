/** Emojis for SilverLink category labels (used across badges, nav, and filters). */
export const CATEGORY_EMOJI: Record<string, string> = {
  "Scams & Safety": "⚠️",
  "Passwords & Accounts": "🔐",
  "Video Calls": "📹",
  "Apps & Phone Settings": "📱",
  "Health & News": "❤️",
  All: "🌐",
  "Browse all": "📋",
};

export function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? "💬";
}
