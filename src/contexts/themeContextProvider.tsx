import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createTheme, Theme } from "@mui/material";
import { useColorTheme } from "../hooks";

type ThemeContextType = {
  mode: string;
  toggleColorMode: () => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
  theme: createTheme(),
});


export const ThemeContextProvider: React.FC<PropsWithChildren>= (props)=> {
  const {children} = props;
  const value = useColorTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}


export const useThemeContext =() => useContext(ThemeContext);

