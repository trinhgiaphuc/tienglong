import '@styles/globals.css';

import * as React from 'react';
import App from 'next/app';
import Navigation from '@components/navigation/Navigation';

import UserProvider from '@lib/userContext';
import { prefetchWords } from '@lib/utils';

// TODO: ADD MODAL!!!!
import Modal from '@components/layouts/Modal';

function MyApp({ Component, pageProps, words }) {
  return Component.noNavigation ? (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  ) : (
    <UserProvider>
      <Navigation />
      <Component {...pageProps} words={words} />
    </UserProvider>
  );
}

MyApp.getInitialProps = prefetchWords(async context => {
  const pageProps = await App.getInitialProps(context);
  return { pageProps, words: context.words };
});

export default MyApp;
