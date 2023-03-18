import { createTheme } from "@mui/material";
import {
  Cutive_Mono,
  Newsreader,
  Sono,
  Special_Elite,
  Yuji_Syuku,
} from "@next/font/google";

const cutive_mono = Cutive_Mono({ weight: "400", subsets: ["latin"] });
const newsreader = Newsreader({ weight: "400", subsets: ["latin"] });
const sono = Sono({ weight: "400", subsets: ["latin"] });
const yuji = Yuji_Syuku({ weight: "400", subsets: ["latin"] });
const special_elite = Special_Elite({ weight: "400", subsets: ["latin"] });

export const theme = createTheme({
  palette: {
    primary: {
      main: "#cc0000",
    },
    secondary: {
      main: "#4f83cc",
    },
    background: {
      default: "#fff5e6",
      paper: "#fff5e6",
    },
    text: {
      primary: "#cc0000",
    },
  },
  typography: {
    fontFamily: sono.style.fontFamily,
    fontSize: 16,
    h1: {
      fontFamily: yuji.style.fontFamily,
    },
    h2: {
      fontFamily: yuji.style.fontFamily,
    },
    h3: {
      fontFamily: yuji.style.fontFamily,
      "@media (max-width: 600px)": {
        fontSize: "2.4rem",
      },
    },
    h4: {
      fontFamily: yuji.style.fontFamily,
      "@media (max-width: 600px)": {
        fontSize: "1.8rem",
      },
    },
    h5: {
      fontFamily: yuji.style.fontFamily,
      "@media (max-width: 600px)": {
        fontSize: "1.3rem",
      },
    },
    h6: {
      fontFamily: sono.style.fontFamily,
    },
    button: {
      textTransform: "none",
    },
  },
});
