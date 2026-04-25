import React, { createContext, useContext, useState, useCallback } from "react";

type TextSize = "normal" | "large";

interface TextSizeContextType {
  textSize: TextSize;
  toggleTextSize: () => void;
}

const TextSizeContext = createContext<TextSizeContextType>({
  textSize: "normal",
  toggleTextSize: () => {},
});

export const useTextSize = () => useContext(TextSizeContext);

export const TextSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>("normal");

  const toggleTextSize = useCallback(() => {
    setTextSize((prev) => (prev === "normal" ? "large" : "normal"));
  }, []);

  return (
    <TextSizeContext.Provider value={{ textSize, toggleTextSize }}>
      <div className={textSize === "large" ? "text-size-large" : ""}>
        {children}
      </div>
    </TextSizeContext.Provider>
  );
};
