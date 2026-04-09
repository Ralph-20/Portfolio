import '@/styles/globals.css';
import '@/styles/global/global.scss';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getHeaderContent } from '@/cms/getHeaderContent';
import Header from '@/components/elem/Header';
import Hero3d from '@/components/elem/Hero3d';
import Cursor from '@/components/elem/Cursor';
import cn from 'classnames';
import styles from '@/components/layouts/PrimaryLayout/PrimaryLayout.module.scss';

export const metadata = {
  title: 'Lucas Ralph',
  description:
    "Portfolio of Lucas Ralph, Software developer with professional experience developing at One North International Digital Agency, Fast Enterprises, and other private clients. With 5 years of experience and a Computer Science degree from the University of Minnesota, I've got plenty of education and experience to provide the most digitally distinct, visibly pleasing, and accessible experience.",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const header = await getHeaderContent();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:opsz,wght@6..12,200;6..12,300;6..12,400;6..12,500;6..12,600&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className={cn(styles.main)}>
          <Hero3d />
          <Cursor />
          <Header tabs={header.tabs} />
          {children}
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}

