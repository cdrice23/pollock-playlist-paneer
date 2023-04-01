import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  colorPromptState,
  loadingState,
  errorModalOpenState,
} from "@/components/atoms";
import styles from "../styles/Home.module.css";
import Cookies from "js-cookie";

function Home() {
  // state and non-functional variables
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  // const [colorPrompt, setColorPrompt] = useRecoilState(colorPromptState);
  // const [colorPrompt, setColorPrompt] = useState(() =>
  //   JSON.parse(initColorPrompt)
  // );
  const [colorPrompt, setColorPrompt] = useState("");
  const [loading, setLoading] = useRecoilState(loadingState);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const menuOpen = Boolean(anchorEl);

  // handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleGenerate = () => {
    setLoading(true);
    router.push("/result");
  };

  // helpers
  // Get track recommendations from an artist (functional)
  // const getArtistRecommendedTracks = (artist) =>
  //   spotifyApi
  //     .getRecommendations({
  //       seed_artists: artist,
  //       limit: 100,
  //     })
  //     .then(
  //       function (data) {
  //         let recommendations = data.body;
  //         // console.log(recommendations);
  //         return recommendations.tracks.map((track) => track.id);
  //       },
  //       function (err) {
  //         console.log(err);
  //       }
  //     );

  const getArtistRecommendedTracks = (artist) =>
    spotifyApi
      .getRecommendations({
        seed_artists: artist,
        limit: 100,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          return recommendations.tracks.map((track) => track.id);
        },
        function (err) {
          console.log(err);
        }
      );

  // Get metadata from tracks
  const getTrackMeta = (tracks) =>
    spotifyApi.getAudioFeaturesForTracks(tracks).then(
      function (data) {
        // console.log(data.body);
        return data.body;
      },
      function (err) {
        console.log(err);
      }
    );

  // Create color range array
  const colorArray = [
    { name: "Gold", value: 0.01 },
    { name: "Yellow", value: 0.02 },
    { name: "LightYellow", value: 0.03 },
    { name: "LemonChiffon", value: 0.04 },
    { name: "LightGoldenRodYellow", value: 0.05 },
    { name: "PapayaWhip", value: 0.06 },
    { name: "Moccasin", value: 0.07 },
    { name: "PeachPuff", value: 0.08 },
    { name: "PaleGoldenRod", value: 0.09 },
    { name: "Khaki", value: 0.1 },
    { name: "DarkKhaki", value: 0.11 },
    { name: "Orange", value: 0.12 },
    { name: "DarkOrange", value: 0.13 },
    { name: "Coral", value: 0.14 },
    { name: "Tomato", value: 0.15 },
    { name: "OrangeRed", value: 0.16 },
    { name: "IndianRed", value: 0.17 },
    { name: "Crimson", value: 0.18 },
    { name: "Red", value: 0.19 },
    { name: "FireBrick", value: 0.2 },
    { name: "DarkRed", value: 0.21 },
    { name: "Pink", value: 0.22 },
    { name: "LightPink", value: 0.23 },
    { name: "HotPink", value: 0.24 },
    { name: "DeepPink", value: 0.25 },
    { name: "PaleVioletRed", value: 0.26 },
    { name: "MediumVioletRed", value: 0.27 },
    { name: "LightSalmon", value: 0.28 },
    { name: "Salmon", value: 0.29 },
    { name: "DarkSalmon", value: 0.3 },
    { name: "LightCoral", value: 0.31 },
    { name: "GreenYellow", value: 0.32 },
    { name: "Chartreuse", value: 0.33 },
    { name: "LawnGreen", value: 0.34 },
    { name: "Lime", value: 0.35 },
    { name: "LimeGreen", value: 0.36 },
    { name: "PaleGreen", value: 0.37 },
    { name: "LightGreen", value: 0.38 },
    { name: "MediumSpringGreen", value: 0.39 },
    { name: "SpringGreen", value: 0.4 },
    { name: "MediumSeaGreen", value: 0.41 },
    { name: "SeaGreen", value: 0.42 },
    { name: "ForestGreen", value: 0.43 },
    { name: "Green", value: 0.44 },
    { name: "DarkGreen", value: 0.45 },
    { name: "YellowGreen", value: 0.46 },
    { name: "OliveDrab", value: 0.47 },
    { name: "DarkOliveGreen", value: 0.48 },
    { name: "MediumAquaMarine", value: 0.49 },
    { name: "DarkSeaGreen", value: 0.5 },
    { name: "LightSeaGreen", value: 0.51 },
    { name: "DarkCyan", value: 0.52 },
    { name: "Teal", value: 0.53 },
    { name: "Aqua", value: 0.54 },
    { name: "Cyan", value: 0.55 },
    { name: "LightCyan", value: 0.56 },
    { name: "PaleTurquoise", value: 0.57 },
    { name: "Aquamarine", value: 0.58 },
    { name: "Turquoise", value: 0.59 },
    { name: "MediumTurquoise", value: 0.6 },
    { name: "DarkTurquoise", value: 0.61 },
    { name: "CadetBlue", value: 0.62 },
    { name: "SteelBlue", value: 0.63 },
    { name: "LightSteelBlue", value: 0.64 },
    { name: "LightBlue", value: 0.65 },
    { name: "PowderBlue", value: 0.66 },
    { name: "LightSkyBlue", value: 0.67 },
    { name: "SkyBlue", value: 0.68 },
    { name: "CornflowerBlue", value: 0.69 },
    { name: "DeepSkyBlue", value: 0.7 },
    { name: "DodgerBlue", value: 0.71 },
    { name: "RoyalBlue", value: 0.72 },
    { name: "Blue", value: 0.73 },
    { name: "MediumBlue", value: 0.74 },
    { name: "DarkBlue", value: 0.75 },
    { name: "Navy", value: 0.76 },
    { name: "MidnightBlue", value: 0.77 },
    { name: "Lavender", value: 0.78 },
    { name: "Thistle", value: 0.79 },
    { name: "Plum", value: 0.8 },
    { name: "Orchid", value: 0.81 },
    { name: "Violet", value: 0.82 },
    { name: "Fuchsia", value: 0.83 },
    { name: "Magenta", value: 0.84 },
    { name: "MediumOrchid", value: 0.85 },
    { name: "DarkOrchid", value: 0.86 },
    { name: "DarkViolet", value: 0.87 },
    { name: "BlueViolet", value: 0.88 },
    { name: "DarkMagenta", value: 0.89 },
    { name: "Purple", value: 0.9 },
    { name: "MediumPurple", value: 0.91 },
    { name: "MediumSlateBlue", value: 0.92 },
    { name: "SlateBlue", value: 0.93 },
    { name: "DarkSlateBlue", value: 0.94 },
    { name: "RebeccaPurple", value: 0.95 },
    { name: "Indigo", value: 0.96 },
    { name: "SaddleBrown", value: 0.97 },
    { name: "Sienna", value: 0.98 },
    { name: "Brown", value: 0.99 },
    { name: "Maroon", value: 1 },
  ];

  // Backoff retry operation
  const retryOperation = async (fn, maxAttempts = 3, delayInSeconds = 3) => {
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        let result = await fn();
        console.log("Success!");
        return result;
      } catch (error) {
        attempts++;
        console.log(`Attempt ${attempts} failed: ${error}`);
        console.log(errorModalOpen);
        await new Promise((resolve) =>
          setTimeout(resolve, delayInSeconds * 1000)
        );
      }
    }
    console.log(`Maximum number of attempts (${maxAttempts}) reached.`);
  };

  // Spotify-specific retry
  const callSpotifyWithRetry = async (
    fn,
    currentRetries = 0,
    maxRetries = 10
  ) => {
    try {
      return await fn();
    } catch (err) {
      if (currentRetries <= maxRetries) {
        console.log("Retry number: " + currentRetries);
        if (err && err.statusCode === 429) {
          const retryAfter =
            (parseInt(e.headers["retry-after"], 10) + 1) * 1000;
          console.log(
            "Retrying after " + retryAfter.toString() / 1000 + " seconds."
          );
          await new Promise((resolve) => setTimeout(resolve, retryAfter));
        }
        return await callSpotifyWithRetry(fn, currentRetries + 1);
      } else {
        console.log("Caught here.");
        throw err;
      }
    }
  };

  // Delay (functional) - unused
  // const delay = (fn, ms) =>
  //   new Promise((resolve) => setTimeout(() => resolve(fn()), ms));

  // countdown v2 (functional)
  // const countdown = (countTo) => {
  //   for (let i = countTo; i > 0; i--) {
  //     setTimeout(() => {
  //       console.log(i);
  //     }, (countTo - i) * 1000);
  //   }
  // };

  useEffect(() => {
    // Check if cached colorPrompt exists
    if (Cookies.get("colorPrompt")) {
      console.log("colorPrompt already generated.");
    } else {
      // Ensure access token is available from custom Spotify hook
      if (spotifyApi.getAccessToken()) {
        // Fetch top artist data from user
        const generateColorPrompt = () => {
          spotifyApi.getMyTopArtists({ limit: 25 }).then(function (data) {
            let topArtistsRaw = data.body.items;
            // Generate full recommended track array from top artist list
            Promise.all(
              topArtistsRaw.map(
                // async (artist) => await getArtistRecommendedTracks(artist.id)
                async (artist) =>
                  await callSpotifyWithRetry(
                    async () => await getArtistRecommendedTracks(artist.id)
                  )
              )
            )
              // Get audio metadata from recommended tracks
              .then((data) => {
                return Promise.all(
                  data.map(
                    async (tracks) =>
                      await callSpotifyWithRetry(
                        async () => await getTrackMeta(tracks)
                      )
                  )
                ).then((data) => data.map((obj) => obj.audio_features));
              })
              // Flatten data in array
              .then((data) => {
                let flattened = data.flat(1);
                return flattened;
              })
              // Calculate color factor
              .then((data) => {
                return data.map((track) =>
                  colorArray
                    .filter(
                      (obj) =>
                        obj.value ===
                        Number((track.energy * track.valence).toFixed(4))
                    )
                    .map((color) => color.name)
                );
              })
              // Flatten data in array
              .then((data) => {
                let flattened = data.flat(1);
                return flattened;
              })
              // generate group count
              .then((data) => {
                const groupByColor = colorArray
                  .map((color) => ({
                    color: color,
                    count: data.filter((item) => item == color.name).length,
                    percentage: Math.round(
                      (data.filter((item) => item == color.name).length /
                        data.length) *
                        100
                    ),
                  }))
                  .filter((obj) => obj.count > 0);
                return groupByColor;
              })
              // Generate search prompt
              .then((data) => {
                const shuffleArray = (array) => {
                  for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                  }
                };
                // Shuffle colors in case n > 30 (using Fisher-Yates randomization)
                shuffleArray(data);
                const colorClause = data
                  .map((obj) => obj.color.name)
                  .slice(0, 30)
                  .join(", ");
                return `An oil painting in the style of Jackson Pollock using the following colors: ${colorClause}`;
              })
              // Set variable
              .then((data) => {
                // setColorPrompt(data);
                Cookies.set("colorPrompt", data);
              });
            // // Catch errors
            // .catch((error) => {
            //   console.log(error);
            // });
          });
        };
        // Use backoff retry in case of error
        retryOperation(generateColorPrompt);
      }
    }
  }, [session]);

  // console.log(colorPrompt);
  // console.log(loading);
  console.log(Cookies.get("colorPrompt"));

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box flexGrow={1}></Box>
          <Link
            href="https://www.buymeacoffee.com/cdrice23"
            target="_blank"
            passHref
            className={styles.link}
          >
            <Button
              color="inherit"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Buy Me a Coffee!
            </Button>
          </Link>
          <Button
            color="inherit"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => {
              Cookies.remove("colorPrompt");
              Cookies.remove("generatedImageUrl");
              signOut();
            }}
          >
            Log Out
          </Button>
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            <MenuItem>
              <Link
                href="https://www.buymeacoffee.com/cdrice23"
                target="_blank"
                className={styles.link}
              >
                Buy Me a Coffee!
              </Link>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box>
        <Typography variant="h3" className={styles.header}>
          What does your music taste{" "}
          <span className={styles.pop}>look like</span> ?
        </Typography>
        <Typography className={styles.body}>
          That's exactly what{" "}
          <strong className={styles.embiggen}>Pollock Paneer</strong> was built
          for.{" "}
        </Typography>
        <Typography className={styles.body}>
          Using OpenAI's DALL-E learning model, you can create a unique,
          AI-generated oil painting in the style of Jackson Pollock that uses{" "}
          <span className={styles.popBody}>YOUR</span> Spotify data.
        </Typography>
        <Accordion
          elevation={0}
          disableGutters
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={styles.carrot} />}
            className={styles.accordionSummary}
          >
            <Typography variant="h4" className={styles.accordionSummaryText}>
              How does it work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles.body}>
              The algorithm takes data on your top artists and translates it
              into characteristics of your listening style. For example - do you
              listen to more high-energy, angry metal music? Or do you like more
              chill, calm classical music? Or maybe your music taste is more
              diverse!
            </Typography>
            <Typography className={styles.body}>
              From there, these characteristics are translated into
              representative colors from a spectrum describing mood. Low-energy,
              sad songs might plot to a color like{" "}
              <span className={styles.midnightBlue}>Midnight Blue</span>,
              whereas a happier, high-energy song might plot to a color like{" "}
              <span className={styles.peachPuff}>Peach Puff</span>.
            </Typography>
            <Typography className={styles.body}>
              Finally, a prompt is given to DALL-E to generate a completely
              unique piece of art that represents{" "}
              <span className={styles.popYou}>YOU.</span>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          elevation={0}
          disableGutters
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={styles.carrot} />}
            className={styles.accordionSummary}
          >
            <Typography variant="h4" className={styles.accordionSummaryText}>
              What's with the name?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles.body}>
              (For those of you who do not know){" "}
              <span className={styles.popBody}>"palak paneer"</span> is a
              traditional North Indian vegetarian dish consisting of pureed
              spinach (<em>"palak"</em> in Hindi) and cheese (<em>"paneer"</em>
              ). If you haven't tried it before, go order some from your local
              Indian restaurant ASAP!
            </Typography>
            <Typography className={styles.body}>
              To be totally honest, the name "Pollock Paneer" was the result of
              intrusive shower thoughts, coupled with a propensity for making
              really bad dad jokes...
            </Typography>
            <Typography className={styles.groans}>*hold for groans*</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          onClick={handleGenerate}
          className={styles.generate}
        >
          <Typography variant="h6">Generate My Painting!</Typography>
        </Button>
      </Box>
    </>
  );
}

// Home.getInitialProps = ({ req }) => {
//   const cookies = parseCookies(req);

//   return {
//     initColorPrompt: cookies.colorPrompt,
//   };
// };

export default Home;
