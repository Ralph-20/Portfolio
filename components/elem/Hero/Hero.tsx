import cn from 'classnames';
import styles from './Hero.module.scss';
import { ImageData } from '@/types';
import Image from 'next/image';

export type HeroProps = {
  primaryHeading: string;
  secondaryHeading: string;
  // todo: update to ImageData from nextjs
  heroImg: ImageData;
};

const Hero = (props: HeroProps): JSX.Element => {
  const { primaryHeading, secondaryHeading, heroImg } = props || {};

  return (
    <div className={cn(styles.main)}>
      <div className={styles['content-container']}>
        <h1 className={styles.heading}>{primaryHeading}</h1>
        <h2 className={styles.subheading}>{secondaryHeading}</h2>
        <div className={styles['image-container']}>
          <Image className={styles.img} src={heroImg.src} alt={heroImg.alt} fill={heroImg.fill} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
