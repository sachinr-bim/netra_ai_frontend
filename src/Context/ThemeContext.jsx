import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const defaultColor = "#009cd2";
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || defaultColor;
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", themeColor);
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
