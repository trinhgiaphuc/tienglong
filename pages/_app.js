import '@styles/globals.css';

import Navigation from '@components/navigation/Navigation';
import UserProvider from '@lib/userContext';

// TODO: ADD MODAL!!!!
import Modal from '@components/layouts/Modal';

function MyApp({ Component, pageProps }) {
  return Component.noNavigation ? (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  ) : (
    <UserProvider>
      <Navigation />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
