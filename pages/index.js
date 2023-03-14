import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";

export default function Home() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [topArtists, setTopArtists] = useState([]);
  const [allRecs, setAllRecs] = useState([]);

  // helpers
  // Get track recommendations from an artist
  const getArtistRecommendedTracks = (artist) =>
    spotifyApi
      .getRecommendations({
        seed_artists: artist,
        limit: 100,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          // console.log(recommendations);
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

  console.log(
    colorArray.filter((obj) => obj.value === 0.44).map((color) => color.name)
  );

  useEffect(() => {
    // Ensure access token is available from custom Spotify hook
    if (spotifyApi.getAccessToken()) {
      // Fetch top artist data from user
      spotifyApi.getMyTopArtists({ limit: 25 }).then(function (data) {
        let topArtistsRaw = data.body.items;
        // console.log(topArtistsRaw);
        let allRecs = [];
        // Generate full recommended track array from top artist list
        Promise.all(
          topArtistsRaw.map((artist) => getArtistRecommendedTracks(artist.id))
        )
          // Get audio metadata from recommended tracks
          .then((data) => {
            return Promise.all(data.map((tracks) => getTrackMeta(tracks))).then(
              (data) => data.map((obj) => obj.audio_features)
            );
          })
          // Flatten data in array
          .then((data) => {
            let flattened = data.flat(1);
            return flattened;
          })
          // Calculate color factor
          .then((data) => {
            return data.map(
              (track) =>
                colorArray
                  .filter(
                    (obj) =>
                      obj.value ===
                      Number((track.energy * track.valence).toFixed(2))
                  )
                  .map((color) => color.name)
              // ({
              //   ...track,
              //   colorFactor: Number((track.energy * track.valence).toFixed(2)),
              // })
            );
          })
          // Flatten data in array
          .then((data) => {
            let flattened = data.flat(1);
            return flattened;
          })
          // Set variable
          .then((data) => {
            setAllRecs(data);
          });
      });
    }
  }, [session, spotifyApi]);

  console.log(allRecs);

  return (
    <>
      <Box>
        <Typography>This is supposed to be the timeline page.</Typography>
      </Box>
      <Button variant="contained" onClick={() => signOut()}>
        Log out
      </Button>
    </>
  );
}
