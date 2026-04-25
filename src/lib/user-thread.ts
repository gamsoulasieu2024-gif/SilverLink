import type { Thread } from "@/types/silverlink";

export function makeUserThread(
  category: string,
  question: string
): Thread {
  const id = `local-${Date.now()}`;
  return {
    id,
    category,
    question,
    asked_by: "local",
    date: "just now",
    helpful_count: 0,
    answers: [],
  };
}
