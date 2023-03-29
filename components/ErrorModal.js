import React from "react";
import { useState, useEffect, useRef } from "react";
import { Typography, Modal, Paper } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import useSpotify from "@/hooks/useSpotify";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  colorPromptState,
  loadingState,
  errorModalOpenState,
} from "@/components/atoms";
import styles from "../styles/Home.module.css";

export default function ErrorModal() {
  const [errorModalOpen, setErrorModalOpen] =
    useRecoilState(errorModalOpenState);
  const [remainingTime, setRemainingTime] = useState(0);
  // const [userClosed, setUserClosed] = useState(false);
  const userClosed = useRef(false);

  const handleModalOpen = () => {
    // setErrorModalOpen(true);
    errorModalOpen.current = true;
  };
  const handleModalClose = () => {
    setErrorModalOpen(false);
    userClosed.current = true;
  };

  // helpers
  //   // Backoff retry function - v4 (functional)
  //   const retryOperation = async (fn, maxAttempts = 3, delayInSeconds = 3) => {
  //     try {
  //       return await fn();
  //     } catch (error) {
  //       userClosed.current ? setErrorModalOpen(false) : setErrorModalOpen(true);
  //       //   userClosed.current
  //       //     ? (errorModalOpen.current = false)
  //       //     : (errorModalOpen.current = true);
  //       for (let attempts = 1; attempts <= maxAttempts; attempts++) {
  //         setTimeout(() => {
  //           countdown(delayInSeconds);
  //           console.log(
  //             "Operation failed. Attempts: " +
  //               attempts +
  //               " Time elapsed: " +
  //               (attempts - 1) * delayInSeconds
  //           );
  //         }, (attempts - 1) * delayInSeconds * 1000);
  //         if (attempts === maxAttempts && userClosed.current === true) {
  //           setErrorModalOpen(false);
  //           userClosed.current = false;
  //         }
  //       }
  //     }
  //   };

  //   // Delay - unused
  //   // const delay = (fn, ms) =>
  //   //   new Promise((resolve) => setTimeout(() => resolve(fn()), ms));

  //   // countdown v2 (functional)
  //   const countdown = (countTo) => {
  //     for (let i = countTo; i > 0; i--) {
  //       setTimeout(() => {
  //         console.log(i);
  //       }, (countTo - i) * 1000);
  //     }
  //   };

  //   const exampleService = () => {
  //     throw "Sample Failure";
  //   };

  //   retryOperation(exampleService);

  return (
    <>
      <Modal open={errorModalOpen} onClose={handleModalClose}>
        <Paper className={styles.errorModal}>
          <Typography>Test Text</Typography>
        </Paper>
      </Modal>
    </>
  );
}
