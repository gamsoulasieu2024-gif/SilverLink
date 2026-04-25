const STORAGE = "silverlink-scam-check-history";
const MAX = 8;

export type HistoryResult = "likely_scam" | "suspicious" | "looks_safe";

export interface ScamCheckHistoryItem {
  id: string;
  preview: string;
  result: HistoryResult;
  at: string;
}

function load(): ScamCheckHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return [];
    const p = JSON.parse(raw) as ScamCheckHistoryItem[];
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

function save(list: ScamCheckHistoryItem[]) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function getScamCheckHistory(): ScamCheckHistoryItem[] {
  return load();
}

export function addScamCheckToHistory(text: string, result: HistoryResult) {
  const preview = text.trim().slice(0, 120) + (text.trim().length > 120 ? "…" : "");
  const item: ScamCheckHistoryItem = {
    id: `h-${Date.now()}`,
    preview: preview || "(empty)",
    result,
    at: new Date().toISOString(),
  };
  const next = [item, ...load()].slice(0, MAX);
  save(next);
  return getScamCheckHistory();
}

export function clearScamCheckHistory() {
  localStorage.removeItem(STORAGE);
}
