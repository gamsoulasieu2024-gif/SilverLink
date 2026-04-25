import React, { createContext, useContext, useLayoutEffect, useState, useCallback } from "react";

type Intensity = "calm" | "intense";

interface BackgroundIntensityContextType {
  intensity: Intensity;
  toggleIntensity: () => void;
}

const BackgroundIntensityContext = createContext<BackgroundIntensityContextType>({
  intensity: "calm",
  toggleIntensity: () => {},
});

export const useBackgroundIntensity = () => useContext(BackgroundIntensityContext);

const STORAGE_KEY = "silverlink-bg-intensity";

export const BackgroundIntensityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [intensity, setIntensity] = useState<Intensity>(() => {
    if (typeof window === "undefined") return "calm";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "intense" ? "intense" : "calm";
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.bgIntensity = intensity;
    try {
      window.localStorage.setItem(STORAGE_KEY, intensity);
    } catch {
      /* ignore */
    }
  }, [intensity]);

  const toggleIntensity = useCallback(() => {
    setIntensity((prev) => (prev === "calm" ? "intense" : "calm"));
  }, []);

  return (
    <BackgroundIntensityContext.Provider value={{ intensity, toggleIntensity }}>
      {children}
    </BackgroundIntensityContext.Provider>
  );
};
