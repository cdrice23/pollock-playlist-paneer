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
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import { openai } from "@/lib/openai";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import ImageResult from "@/components/ImageResult";
import styles from "../styles/Result.module.css";
import Cookies from "js-cookie";
import HelpModal from "@/components/HelpModal";

export default function Result() {
  // state
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const [imageUrl, setImageUrl] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [expirationTime, setExpirationTime] = useState(
    Cookies.get("expirationTime")
  );

  // handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleHelpOpen = () => {
    setHelpOpen(true);
  };
  const handleHelpClose = () => {
    setHelpOpen(false);
  };

  // UseEffect on initial load to check for cookies
  useEffect(() => {
    setLoading(true);
    let retries = 0;
    const intervalId = setInterval(() => {
      if (retries >= 10) {
        clearInterval(intervalId);
        // console.log("Exceeded maximum retries, exiting");
        throw new Error("Exceeded maximum retries, exiting image generation");
      }
      if (Cookies.get("colorPrompt")) {
        clearInterval(intervalId);
        // console.log("Got color prompt. Waiting for image URL next");
        if (Cookies.get("generatedImageUrl")) {
          // console.log("Using existing generated Image URL");
          setLoading(false);
        } else {
          // console.log("Trying to fetch the generatedImageURL");
          const generateImage = async () => {
            const prompt = Cookies.get("colorPrompt");
            const response = await fetch("/api/image", {
              // const response = await fetch("/api/edge", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ prompt }),
            });
            const imageResponse = await response.json();
            const url = await imageResponse.imageUrl;
            const expiration = await imageResponse.expirationDate;
            Cookies.set("expirationTime", expiration);
            Cookies.set("generatedImageUrl", url);
            setImageUrl(url);
          };
          generateImage();
          setLoading(false);
        }
      } else {
        retries++;
        // console.log("Color prompt not populated, retrying...");
      }
    }, 1000);
  }, []);

  useEffect(() => {
    setImageUrl(Cookies.get("generatedImageUrl"));
  }, []);

  // UseEffect for checking expiration
  useEffect(() => {
    if (expirationTime && expirationTime < Date.now()) {
      setImageUrl(null);
      setExpirationTime(null);
      Cookies.remove("generatedImageUrl");
      Cookies.remove("expirationTime");
    }
  }, [expirationTime]);

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
              signOut().then(() => {
                Cookies.remove("colorPrompt");
                Cookies.remove("generatedImageUrl");
                Cookies.remove("expirationTime");
                Cookies.remove("userTopArtists");
                Cookies.remove("userColors");
              });
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
                signOut().then(() => {
                  Cookies.remove("colorPrompt");
                  Cookies.remove("generatedImageUrl");
                  Cookies.remove("expirationTime");
                  Cookies.remove("userTopArtists");
                  Cookies.remove("userColors");
                });
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
          <HelpModal
            helpOpen={helpOpen}
            handleHelpOpen={handleHelpOpen}
            handleHelpClose={handleHelpClose}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      {imageUrl ? (
        expirationTime < Date.now() ? (
          <Box mt="25%">
            <Typography className={styles.body}>
              Generated image has expired. Please log-out and log back in to
              generate a new one!
            </Typography>
          </Box>
        ) : (
          <>
            <ImageResult session={session} imageLoc={imageUrl} />
            <Typography
              className={styles.body}
            >{`Note: Images generated by DALL-E will expire after 2 hours (${new Date(
              Cookies.get("expirationTime")
            ).toLocaleTimeString()})`}</Typography>
            <Box
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={4}
            >
              <Typography marginRight={2} fontSize={"0.9rem"}>
                Metadata provided by
              </Typography>
              <Image
                src="/Spotify_Logo.png"
                width={106}
                height={35}
                alt="Spotify logo"
              />
            </Box>
          </>
        )
      ) : (
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
      )}
    </>
  );
}
