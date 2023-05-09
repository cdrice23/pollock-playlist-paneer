import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
import { StyledEngineProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
// tested from MUI/next.js tutorial
import PropTypes from "prop-types";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../lib/createEmotionCache";

// tested from MUI/next.js tutorial
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <StyledEngineProvider injectFirst>
        {/* cacheprovider and head tested from MUI/next.js tutorial */}
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
