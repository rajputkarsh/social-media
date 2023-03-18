import { PaletteMode } from "@mui/material";

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: '#F56B85',
              main: '#E3405F',
              light: '#B72A44',
            },
            neutral: {
              dark: "#E0E0E0",
              main: "#C2C2C2",
              mediumMain: "#A3A3A3",
              medium: "#858585",
              light: "#333333",
            },
            background: {
              default: "#0A0A0A",
              alt: "#1A1A1A",
            },
            text: {
              primary: "#FFFFFF"
            }
          }
        : {
            // palette values for light mode
            primary: {
              dark: '#C11B39',
              main: '#E3405F',
              light: '#FD94A7',
            },
            neutral: {
              dark: "#333333",
              main: "#666666",
              mediumMain: "#858585",
              medium: "#A3A3A3",
              light: "#F0F0F0",
            },
            background: {
              default: "#F6F6F6",
              alt: "#FFFFFF",
            },
            text: {
              default: "#333333"
            }
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};