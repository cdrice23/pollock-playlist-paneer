import { Box, Button, Typography, Grid } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import Cookies from "js-cookie";

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default function Login(props) {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
        marginTop={-2}
      >
        <Typography variant="h3" className={styles.title}>
          Pollock Paneer
        </Typography>
        <Box
          position={"relative"}
          width={"100vw"}
          height={"100vw"}
          maxHeight={400}
          maxWidth={400}
          margin="auto"
          className={styles.logo}
        >
          <Image
            src="/logo.webp"
            alt="A line-drawing of Jackson Pollock wearing headphones."
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw"
            priority="true"
          />
        </Box>
        <Typography variant="h5" fontStyle={"italic"} className={styles.title}>
          {`"canvas inspired by soundwaves."`}
        </Typography>
        <Box className={styles.buttonContainer}>
          {Object.values(props.providers).map((provider) => (
            <Button
              variant="contained"
              key={provider.name}
              onClick={() => {
                Cookies.remove("colorPrompt");
                Cookies.remove("generatedImageUrl");
                Cookies.remove("expirationTime");
                signIn(provider.id, { callbackUrl: "/" });
              }}
            >
              Login with {provider.name}
            </Button>
          ))}
        </Box>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={4}
        >
          <Typography marginRight={2}>Powered by</Typography>
          <Image
            src="/Spotify_Logo.png"
            width={104}
            height={35}
            alt="Spotify logo"
          />
        </Box>
      </Box>
    </>
  );
}
