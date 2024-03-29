import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/ImageResult.module.css";
import Cookies from "js-cookie";
import Explanation from "./Explanation";

export default function ImageResult({ session }, props) {
  return (
    <Box textAlign={"center"}>
      <Typography variant="h4" className={styles.title}>
        {session
          ? `Presenting... ${session.user.name}'s very own "Jackson Pollock."`
          : `Presenting... your very own "Jackson Pollock."`}
      </Typography>
      <Explanation />
      <Box
        position={"relative"}
        width={"100vw"}
        height={"100vw"}
        maxHeight={512}
        maxWidth={512}
        margin="auto"
        className={styles.imageBox}
      >
        <Image
          key="generatedImageUrl"
          src={Cookies.get("generatedImageUrl")}
          alt="Sample"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw"
          priority="true"
          className={styles.imageInner}
        />
      </Box>
    </Box>
  );
}
