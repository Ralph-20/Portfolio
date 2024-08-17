import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/global/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <PrimaryLayout>{<Component {...pageProps} />}</PrimaryLayout>;
}

export default MyApp;

