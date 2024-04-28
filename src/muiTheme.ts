import {
  ThemeOptions,
  createTheme,
  PaletteOptions,
  PaletteColorOptions,
} from "@mui/material";
import { useColorTheme } from "./hooks";
import { amber, common, indigo, blue, blueGrey, deepOrange, green, grey , lightGreen, lime, pink, purple } from "@mui/material/colors";



// Extend the existing PaletteOptions interface with the custom palette option
interface CustomPaletteOptions extends PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions
  // Add more custom palette options if needed
}


// Define your custom palette option
const customPalette: CustomPaletteOptions = {
  primary: blue,
  secondary: pink,  
  // Add more custom palette options if needed
};

// Create the MUI theme using the defined custom palette
const theme: ThemeOptions = {
  palette: customPalette,
  typography: {
    fontFamily: "Inter, sans-serif",
    
    
    // Add more typography options if needed
  },
  // Add more custom options for the theme if needed
};

export default theme;


