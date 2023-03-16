import { Box, Button, Typography, Grid } from "@mui/material";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

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
      <Box>
        <Typography variant="h2">Pollock Playlist Paneer.</Typography>
        <Box
          position={"relative"}
          width={"100vw"}
          height={"100vw"}
          maxHeight={400}
          maxWidth={400}
          margin="auto"
        >
          <Image
            src="/logo.png"
            alt="A line-drawing of Jackson Pollock wearing headphones."
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw"
            priority="true"
          />
        </Box>
        <Typography variant="h5" fontStyle={"italic"}>
          What does your music taste look like?
        </Typography>
        {Object.values(props.providers).map((provider) => (
          <Button
            variant="contained"
            key={provider.name}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </Button>
        ))}
      </Box>
    </>
  );
}
