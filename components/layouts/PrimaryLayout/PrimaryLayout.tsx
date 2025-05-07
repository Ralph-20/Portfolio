import cn from 'classnames';
import styles from './PrimaryLayout.module.scss';
import React from 'react';
import Header from '@/components/elem/Header';
import data from '@/data/data.json';
import Cursor from '@/components/elem/Cursor';
import { Analytics } from '@vercel/analytics/react';

export type PrimaryLayoutProps = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  const HeaderData = data.GlobalData.Header;

  return (
    <div className={cn(styles.main)}>
      <Cursor />
      <Header tabs={HeaderData.tabs} />
      {children}
      <Analytics />
    </div>
  );
};

export default PrimaryLayout;
