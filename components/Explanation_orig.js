import { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
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
            alignItems={"flex-start"}
            textAlign={"center"}
            padding={2}
            rowSpacing={2}
          >
            <Grid item xs={12} md={6} width={"300px"} paddingX={3}>
              <Typography variant="h6">Your Top Artists</Typography>
              <Stack width={"100%"} display="inline-block" textAlign={"left"}>
                {Cookies.get("userTopArtists")
                  .split(",")
                  .map((item) => {
                    return (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          fontSize: "0.65em",
                          height: 20,
                          marginX: 0.15,
                        }}
                      />
                    );
                  })}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} width={"300px"}>
              <Typography variant="h6">Your Color Palette</Typography>
              <Stack width={"100%"} display="inline-block" textAlign={"left"}>
                {Cookies.get("userColors")
                  .split(",")
                  .map((item) => {
                    return (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          fontSize: "0.65em",
                          height: 20,
                          marginX: 0.15,
                        }}
                      />
                    );
                  })}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
