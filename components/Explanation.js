import { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import styles from "../styles/Explanation.module.css";
import Cookies from "js-cookie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Explanation() {
  // state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // handlers
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
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
          <Box width={"100%"}>
            <Box>
              <Tabs value={activeTab} onChange={handleChange} minWidth={"100%"}>
                <Tab label="Your Top Artists" wrapped />
                <Tab label="Your Color Palette" wrapped />
              </Tabs>
              <TabPanel value={activeTab} index={0}>
                <Stack
                  minWidth={"100%"}
                  display="inline-block"
                  textAlign={"left"}
                >
                  {Cookies.get("userTopArtists")
                    .split(",")
                    .map((item) => {
                      return (
                        <Chip
                          key={item}
                          label={item}
                          sx={{
                            fontSize: "0.8em",
                            // height: 20,
                            marginY: 0.25,
                            marginX: 0.15,
                          }}
                        />
                      );
                    })}
                </Stack>
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                <Stack
                  minWidth={"100%"}
                  display="inline-block"
                  textAlign={"left"}
                >
                  {Cookies.get("userColors")
                    .split(",")
                    .map((item) => {
                      return (
                        <Chip
                          key={item}
                          label={item}
                          variant="outlined"
                          avatar={
                            <div
                              className={styles.splash}
                              style={{ backgroundColor: item }}
                            ></div>
                          }
                          sx={{
                            fontSize: "0.8em",
                            marginY: 0.25,
                            marginX: 0.15,
                            borderColor: "#cc0000",
                          }}
                        />
                      );
                    })}
                </Stack>
              </TabPanel>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
