import '@styles/globals.css';

import * as React from 'react';
import Navigation from '@components/navigation/Navigation';
import UserProvider from '@lib/userContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      {Component.noNavigation ? null : <Navigation />}
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
