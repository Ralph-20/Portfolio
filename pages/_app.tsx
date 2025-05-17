import PrimaryLayout from '@/components/layouts/PrimaryLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '../styles/global/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const { header, ...rest } = pageProps;

  return <PrimaryLayout header={header}>{<Component {...rest} />}</PrimaryLayout>;
}

export default MyApp;

