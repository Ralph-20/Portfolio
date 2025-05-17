import cn from 'classnames';
import styles from './PrimaryLayout.module.scss';
import React from 'react';
import Header, { HeaderProps } from '@/components/elem/Header';
import Cursor from '@/components/elem/Cursor';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

type HeaderData = {
  header: {
    tabs: HeaderProps['tabs'];
  };
};

export type PrimaryLayoutProps = HeaderData & {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children, header }) => {
  return (
    <div className={cn(styles.main)}>
      <Cursor />
      <Header tabs={header?.tabs || []} />
      {children}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default PrimaryLayout;
