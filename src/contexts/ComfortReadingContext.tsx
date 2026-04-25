import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE = "silverlink-comfort-text";

type Ctx = {
  largeText: boolean;
  setLargeText: (v: boolean) => void;
  toggleLargeText: () => void;
};

const ComfortReadingContext = createContext<Ctx | null>(null);

export function ComfortReadingProvider({ children }: { children: ReactNode }) {
  const [largeText, setLargeTextState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE) === "1";
    } catch {
      return false;
    }
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("text-size-large", largeText);
    try {
      localStorage.setItem(STORAGE, largeText ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [largeText]);

  const setLargeText = useCallback((v: boolean) => setLargeTextState(v), []);
  const toggleLargeText = useCallback(() => setLargeTextState((s) => !s), []);

  return (
    <ComfortReadingContext.Provider
      value={{ largeText, setLargeText, toggleLargeText }}
    >
      {children}
    </ComfortReadingContext.Provider>
  );
}

export function useComfortReading() {
  const ctx = useContext(ComfortReadingContext);
  if (!ctx) {
    throw new Error("useComfortReading must be used within ComfortReadingProvider");
  }
  return ctx;
}
