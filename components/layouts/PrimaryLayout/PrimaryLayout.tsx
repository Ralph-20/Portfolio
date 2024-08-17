import cn from 'classnames';
import styles from './PrimaryLayout.module.scss';
import React from 'react';
import Header from '@/components/elem/Header';
import data from '@/data/data.json';

export type PrimaryLayoutProps = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  const HeaderData = data.GlobalData.Header;

  return (
    <div className={cn(styles.main)}>
      <Header tabs={HeaderData.tabs} />
      {children}
    </div>
  );
};

export default PrimaryLayout;
