import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import createEmotionCache from '../utility/createEmotionCache';
import '../styles/globals.css';
import Layout from '../components/layout';
import { SessionProvider } from 'next-auth/react'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material/styles';


interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const CleanKing: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { router } = props;
  const getLayout =
  router.pathname.includes('/admin') ? ((page) => <SessionProvider children={page} />)
  : ((page) => <Layout children={page} />);
  return (
    <div>
    <Head>
      <title>Clean King - Car Detailing Services in Blissfield, MI</title>
      <meta property="description" content="Auto detailing company located in Blissfield Michigan, offering interior, exterior, deluxe, and a la carte detailing services. " key="description" />
      <meta property="og:title" content="Clean King - Car Detailing Services in Blissfield, MI" key="title" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ba000d"/>
      <meta name="msapplication-TileColor" content="#ba000d"/>
      <meta name="theme-color" content="#ba000d"></meta>
    </Head>
    
    <CacheProvider value={emotionCache}>
    <CssVarsProvider defaultMode='system'>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </CssVarsProvider>
    </CacheProvider>
    </div>
  );
};

export default CleanKing;