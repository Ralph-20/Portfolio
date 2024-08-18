import cn from 'classnames';
import styles from './Hero.module.scss';
import { ImageData } from '@/types';
import Image from 'next/image';
import { emitKeypressEvents } from 'readline';

export type HeroProps = {
  primaryHeading: string;
  secondaryHeadings: string[];
  eyebrow: string;
  // todo: update to ImageData from nextjs
  heroImg: ImageData;
};

const Hero = (props: HeroProps): JSX.Element => {
  const { primaryHeading, secondaryHeadings, heroImg, eyebrow } = props || {};

  return (
    <div className={cn(styles.main)}>
      <div className={styles['content-container']}>
        <h1 className={styles.heading}>{primaryHeading}</h1>
        {/* <div className={styles['bottom']}> */}
        <div className={styles['secondary-headings']}>
          <h2 className={styles.subheading}>{eyebrow}</h2>
          {/* {secondaryHeadings.map((secondaryHead) => {
            return <h2 className={styles.subheading}>{secondaryHead}</h2>;
          })} */}
        </div>
        {/* <div className={styles['image-container']}>
            <Image className={styles.img} src={heroImg.src} alt={heroImg.alt} fill={heroImg.fill} />
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Hero;
