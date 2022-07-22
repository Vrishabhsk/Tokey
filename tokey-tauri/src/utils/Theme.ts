import { createTheme } from "@nextui-org/react";

//themes
export const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#141E27",
      iconColor: "#fff",
    },
  },
});

//light theme
export const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      background: "#DDDDDD",
      iconColor: "#000",
    },
  },
});
