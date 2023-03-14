import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";

export default function Home() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [genreSeeds, setGenreSeeds] = useState([]);
  const [colorArray, setColorArray] = useState([]);

  console.log(genreSeeds);

  useEffect(() => {
    // Ensure access token is available from custom Spotify hook
    if (spotifyApi.getAccessToken()) {
      // Fetch genre seeds
      const getGenreSeeds = async () => {
        await axios
          .get(
            "https://api.spotify.com/v1/recommendations/available-genre-seeds",
            {
              headers: {
                Authorization: `Bearer ` + session.user.accessToken,
              },
            }
          )
          .then((res) => {
            setGenreSeeds(res.data.genres);
          });
      };
      getGenreSeeds();

      // Get recommendations based on genre seeds
      const getSampleRecs = async (genre) =>
        await spotifyApi
          .getRecommendations({
            seed_genres: [genre],
            limit: 100,
          })
          .then((data) => {
            return data.body.tracks.map((track) => {
              return track.id;
            });
          })
          .catch((error) => console.log(error));

      // const getAllRecs = async () => {
      //   const recReqs = genreSeeds.map((genre) => getSampleRecs(genre));
      //   const recRes = await Promise.all(recReqs);
      //   const recPromises = recRes.map((res) => res.text());
      //   return await Promise.all(recPromises);
      // };

      console.log(getSampleRecs("country"));
    }
  }, [session, spotifyApi]);

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
