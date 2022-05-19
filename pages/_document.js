import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/assets/logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Main />
      <div id="modal"></div>
      <NextScript />
    </Html>
  );
};

export default MyDocument;
