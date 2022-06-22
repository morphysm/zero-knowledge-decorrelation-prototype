import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from '../context/SessionProvider';
import ViewportProvider from '../context/ViewportProvider';
import Background from '../components/organisms/background/Background';
import Navigation from '../components/organisms/navigation/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ViewportProvider>
        <Navigation />
        <Component {...pageProps} />
        <Background />
      </ViewportProvider>
    </SessionProvider>
  );
}

export default MyApp;
