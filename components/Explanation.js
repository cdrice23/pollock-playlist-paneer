import { useState } from "react";
import { Button, Modal, Typography, Grid, Paper } from "@mui/material";
import styles from "../styles/Explanation.module.css";
import Cookies from "js-cookie";

export default function Explanation() {
  // state
  const [modalOpen, setModalOpen] = useState(false);

  // handlers
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  console.log(Cookies.get("userTopArtists"));
  console.log(Cookies.get("userColors"));

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ marginTop: 1 }}
        onClick={handleModalOpen}
      >
        Why does it look like this?
      </Button>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Paper className={styles.helpModal}>
          <Grid
            container
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <Grid item xs={12} md={6} width={"300px"}>
              <Typography variant="h6">Your Top Artists</Typography>
              <Typography>{Cookies.get("userTopArtists")}</Typography>
            </Grid>
            <Grid item xs={12} md={6} width={"300px"}>
              <Typography variant="h6">Your Color Palette</Typography>
              <Typography>{Cookies.get("userColors")}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
