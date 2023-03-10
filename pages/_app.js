import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import { StyledEngineProvider } from "@mui/material";
// tested from MUI/next.js tutorial
import PropTypes from "prop-types";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../lib/createEmotionCache";

// tested from MUI/next.js tutorial
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={emotionCache}>
        {/* cacheprovider and head tested from MUI/next.js tutorial */}
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
