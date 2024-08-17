import cn from 'classnames';
import styles from './PrimaryLayout.module.scss';
import React from 'react';

export type PrimaryLayoutProps = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children }) => {
  return <div className={cn(styles.main)}>{children}</div>;
};

export default PrimaryLayout;
