import '@styles/globals.css';

import Navigation from '@components/navigation/Navigation';
import UserProvider from '@lib/userContext';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return Component.noNavigation ? (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  ) : (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Navigation />
        <Component {...pageProps} />
      </UserProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
