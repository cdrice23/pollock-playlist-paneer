import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  Source_Code_Pro,
  Sono,
  Cutive_Mono,
  Rokkitt,
  Josefin_Slab,
  Newsreader,
  Scope_One,
  Rhodium_Libre,
  Yuji_Syuku,
  Linden_Hill,
  Press_Start_2P,
  Special_Elite,
  Raleway_Dots,
  Bungee_Hairline,
} from "@next/font/google";

const source_code_pro = Source_Code_Pro({ weight: "400", subsets: ["latin"] });
const sono = Sono({ weight: "400", subsets: ["latin"] });
const cutive_mono = Cutive_Mono({ weight: "400", subsets: ["latin"] });
const rokkitt = Rokkitt({ weight: "400", subsets: ["latin"] });
const josefin_slab = Josefin_Slab({ weight: "400", subsets: ["latin"] });
const newsreader = Newsreader({ weight: "400", subsets: ["latin"] });
const scope_one = Scope_One({ weight: "400", subsets: ["latin"] });
const rhodium_libre = Rhodium_Libre({ weight: "400", subsets: ["latin"] });
const yuji_syuku = Yuji_Syuku({ weight: "400", subsets: ["latin"] });
const linden_hill = Linden_Hill({ weight: "400", subsets: ["latin"] });
const press_start_2p = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const special_elite = Special_Elite({ weight: "400", subsets: ["latin"] });
const raleway_dots = Raleway_Dots({ weight: "400", subsets: ["latin"] });
const bungee_hairline = Bungee_Hairline({ weight: "400", subsets: ["latin"] });

// Unused component originally used for testing out font styles
export default function FontSwatch(props) {
  const fontList = [
    {
      name: "Source_Code_Pro",
      fontFamily: source_code_pro.className,
    },
    {
      name: "Sono",
      fontFamily: sono.className,
    },
    {
      name: "Cutive_Mono",
      fontFamily: cutive_mono.className,
    },
    {
      name: "Rokkitt",
      fontFamily: rokkitt.className,
    },
    {
      name: "Josefin_Slab",
      fontFamily: josefin_slab.className,
    },
    {
      name: "Newsreader",
      fontFamily: newsreader.className,
    },
    {
      name: "Scope_One",
      fontFamily: scope_one.className,
    },
    {
      name: "Rhodium_Libre",
      fontFamily: rhodium_libre.className,
    },
    {
      name: "Yuji_Syuku",
      fontFamily: yuji_syuku.className,
    },
    {
      name: "Linden_Hill",
      fontFamily: linden_hill.className,
    },
    {
      name: "Press_Start_2P",
      fontFamily: press_start_2p.className,
    },
    {
      name: "Special_Elite",
      fontFamily: special_elite.className,
    },
    {
      name: "Raleway_Dots",
      fontFamily: raleway_dots.className,
    },
    {
      name: "Bungee_Hairline",
      fontFamily: bungee_hairline.className,
    },
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" py={3}>
            Typography Fonts
          </Typography>
        </Grid>
        {fontList.map((obj) => (
          <Grid item xs={12} md={3} key={obj.name}>
            <Typography
              variant="h4"
              align="center"
              sx={obj}
              className={obj.fontFamily}
            >
              <strong>{obj.name}</strong>
            </Typography>
            <Typography sx={obj} p={2} className={obj.fontFamily}>
              That's exactly what{" "}
              <strong>
                <em>Pollock Playlist Paneer</em>
              </strong>{" "}
              was built for. Using OpenAI's DALL-E learning model, you can
              generate a unique, AI-generated oil painting in the style of
              Jackson Pollock that uses YOUR Spotify data.
            </Typography>
            <Typography sx={obj} p={2} className={obj.fontFamily}>
              The algorithm takes data on your top artists and translates it
              into characteristics of your listening style - do you listen to
              high-energy, angry music? Or do you like more chill classical
              music?
            </Typography>
            <Typography sx={obj} p={2} className={obj.fontFamily}>
              From there, these characteristics are translated into
              representative colors from a spectrum describing mood -
              low-energy, sad songs might plot to a color like Midnigtht Blue;
              whereas a happier, high-energy song might plot to a color like
              Lemon Chiffon.
            </Typography>
            <Typography sx={obj} p={2} className={obj.fontFamily}>
              Finally, a prompt is given to DALL-E to generate a completely
              unique piece of art that represents YOU.
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
