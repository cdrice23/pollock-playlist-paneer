import { Box, Typography, IconButton, Paper, Modal } from "@mui/material";
import { Help } from "@mui/icons-material";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function HelpModal({
  handleHelpOpen,
  helpOpen,
  handleHelpClose,
}) {
  return (
    <>
      <IconButton onClick={handleHelpOpen} color="inherit">
        <Help />
      </IconButton>
      <Modal open={helpOpen} onClose={handleHelpClose}>
        <Paper className={styles.helpModal}>
          <Typography
            variant="h5"
            textAlign={"center"}
            className={styles.helpTitle}
          >
            Need Help Removing Spotify Access from Pollock Paneer?
          </Typography>
          <Typography
            textAlign={"center"}
            fontSize={"0.9em"}
          >{`It's super easy! Just follow these steps:`}</Typography>
          <Typography maxWidth={"100%"} fontSize={"0.9em"}>
            <ol>
              <li>
                Go to{" "}
                <Link
                  href="https://www.spotify.com/account/apps/"
                  target="_blank"
                  className={styles.modalLink}
                >
                  this link
                </Link>
              </li>
              <li>{`Under "Manage apps", find "pollock-paneer" and click the "remove access" button`}</li>
            </ol>
          </Typography>
          {/* Mobile images */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              src="/remove_1.png"
              alt="A screenshot of the pollock-paneer item in manage apps screen of Spotify"
              height={95}
              width={214}
              className={styles.screenshot}
            />
            <Image
              src="/remove_2.png"
              alt="A screenshot of the remove app button in manage apps screen of Spotify"
              height={95}
              width={214}
              className={styles.screenshot}
            />
          </Box>
          {/* Desktop images */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              src="/remove_access.png"
              alt="A screenshot manage apps screen of Spotify"
              height={61}
              width={532}
              className={styles.screenshot}
            />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
