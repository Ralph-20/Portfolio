'use client';

import cn from 'classnames';
import styles from './Hero3d.module.scss';
import StarsScene from './Hero3dAnim';

export type Hero3dProps = {};

const Hero3d = (props: Hero3dProps): React.JSX.Element => {
  return <div className={styles.main}>{<StarsScene />}</div>;
};

export default Hero3d;
