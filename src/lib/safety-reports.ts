const STORAGE = "silverlink-safety-reports";
const MAX = 50;

export type ReportKind = "thread" | "answer";

export interface SafetyReport {
  id: string;
  kind: ReportKind;
  threadId: string;
  answerId?: string;
  reason: string;
  note: string;
  createdAt: string;
}

function load(): SafetyReport[] {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return [];
    const p = JSON.parse(raw) as SafetyReport[];
    return Array.isArray(p) ? p : [];
  } catch {
    return [];
  }
}

function save(list: SafetyReport[]) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function getSafetyReports(): SafetyReport[] {
  return load().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function submitSafetyReport(input: {
  kind: ReportKind;
  threadId: string;
  answerId?: string;
  reason: string;
  note?: string;
}): SafetyReport {
  const entry: SafetyReport = {
    id: `r-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind: input.kind,
    threadId: input.threadId,
    answerId: input.answerId,
    reason: input.reason,
    note: (input.note ?? "").slice(0, 500),
    createdAt: new Date().toISOString(),
  };
  const next = [entry, ...load()];
  save(next.slice(0, MAX));
  return entry;
}
