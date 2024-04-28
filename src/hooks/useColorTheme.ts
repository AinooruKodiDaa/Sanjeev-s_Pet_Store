import { useState, useEffect } from "react";
import { PaletteMode, createTheme } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useMemo } from "react";
import theme from "../muiTheme";


export const useColorTheme = () => {
  // Retrieve theme mode from local storage on initial load
  const storedMode = localStorage.getItem("themeMode") as PaletteMode;
  const [mode, setMode] = useState<PaletteMode>(storedMode || "light");

  // Toggle theme mode and update local storage
  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  // Create modified theme based on current mode
  const modifiedTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: { ...theme.palette, mode },
      }),
    [mode]
  );

  // Update local storage if mode changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return { theme: modifiedTheme, mode, toggleColorMode };
};
