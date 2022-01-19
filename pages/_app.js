import Navigation from '@components/Navigation';
import { Fragment } from 'react';
import Hero from '../components/Hero';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log(Component());
  return Component.enter ? (
    <Component {...pageProps} />
  ) : (
    <Fragment>
      <Navigation />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
