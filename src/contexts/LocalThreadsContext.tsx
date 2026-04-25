import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Thread } from "@/types/silverlink";
import { seedThreads } from "@/lib/silverlink-data";
import { makeUserThread } from "@/lib/user-thread";

const STORAGE_KEY = "silverlink-local-threads";

function loadFromStorage(): Thread[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Thread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

type LocalThreadsContextValue = {
  allThreads: Thread[];
  addUserQuestion: (category: string, question: string) => void;
};

const LocalThreadsContext = createContext<LocalThreadsContextValue | null>(null);

export function LocalThreadsProvider({ children }: { children: ReactNode }) {
  const [localThreads, setLocalThreads] = useState<Thread[]>([]);

  useEffect(() => {
    setLocalThreads(loadFromStorage());
  }, []);

  const allThreads = useMemo(() => [...localThreads, ...seedThreads], [localThreads]);

  const addUserQuestion = useCallback((category: string, question: string) => {
    const thread = makeUserThread(category, question);
    setLocalThreads((prev) => {
      const next = [thread, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <LocalThreadsContext.Provider value={{ allThreads, addUserQuestion }}>
      {children}
    </LocalThreadsContext.Provider>
  );
}

export function useLocalThreadsContext() {
  const ctx = useContext(LocalThreadsContext);
  if (!ctx) {
    throw new Error("useLocalThreadsContext must be used within LocalThreadsProvider");
  }
  return ctx;
}
