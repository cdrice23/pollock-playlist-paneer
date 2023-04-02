import React from "react";
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
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import { openai } from "@/lib/openai";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { loadingState } from "@/components/atoms";
import Loader from "@/components/Loader";
import ImageResult from "@/components/ImageResult";
import styles from "../styles/Result.module.css";
import Cookies from "js-cookie";

export default function Result() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  // const [colorPrompt, setColorPrompt] = useRecoilState(colorPromptState);
  // const [generatedImage, setGeneratedImage] =
  //   useRecoilState(generatedImageState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(openai);

  useEffect(() => {
    let retries = 0;
    const intervalId = setInterval(() => {
      if (retries >= 10) {
        clearInterval(intervalId);
        console.log("Exceeded maximum retries, exiting");
        return;
      }
      if (Cookies.get("colorPrompt")) {
        clearInterval(intervalId);
        console.log("Got color prompt. Waiting for image URL next");
        if (Cookies.get("generatedImageUrl")) {
          console.log("Using existing generated Image URL");
          setLoading(false);
        } else {
          console.log("Trying to fetch the generatedImageURL");
          const generateImage = async () => {
            const prompt = Cookies.get("colorPrompt");
            const response = await fetch("/api/image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt }),
            });
            const imageResponse = await response.json();
            console.log(imageResponse);

            Cookies.set("generatedImageUrl", imageResponse.imageUrl);
          };
          generateImage();
          setLoading(false);
        }
      } else {
        retries++;
        console.log("Color prompt not populated, retrying...");
      }
    }, 1000);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 10000);
  }, []);

  // console.log(colorPrompt);
  console.log(loading);
  console.log(session);
  console.log(Cookies.get("generatedImageUrl"));

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
            onClick={() => signOut()}
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
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem>
              <Link
                href="https://www.buymeacoffee.com/cdrice23"
                target="_blank"
                className={styles.link}
              >
                Buy Me a Coffee!
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                Cookies.remove("colorPrompt");
                Cookies.remove("generatedImageUrl");
                signOut();
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {loading ? (
        <>
          <Loader />
          <Box display={"flex"} justifyContent="center">
            <Typography variant="h3" display={"inline-block"}>
              Painting
            </Typography>
            <Typography variant="h3" className={styles.loading}>
              ...
            </Typography>
          </Box>
        </>
      ) : (
        <ImageResult session={session} />
      )}
    </>
  );
}
