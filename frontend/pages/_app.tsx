import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from '../context/SessionProvider';
import ViewportProvider from '../context/ViewportProvider';
import Background from '../components/organisms/background/Background';
import Navigation from '../components/organisms/navigation/Navigation';
import MetamaskProvider from '../context/MetamaskProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ViewportProvider>
        <MetamaskProvider>
          <Navigation />
          <Component {...pageProps} />
        </MetamaskProvider>
        <Background />
      </ViewportProvider>
    </SessionProvider>
  );
}

export default MyApp;
