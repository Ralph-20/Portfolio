import cn from 'classnames';
import styles from './About.module.scss';
import Text from '@/components/helpers/Text';
import Image, { ImageProps } from 'next/image';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from '@/utils/gsap';

export type AboutProps = {
  headline: string;
  secondaryHead: string;
  description: string;
  image: ImageProps;
};

const About = (props: AboutProps): JSX.Element => {
  const { headline, secondaryHead, description, image } = props || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 5,
        },
      });

      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0 }
      );
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
      <div className={cn('container-10', styles.wrapper)}>
        <div className={styles.container}>
          <div className={styles['content-left']}>
            <div className={styles['heading-container']}>
              <Text field={headline} className={styles.heading} />
              <Text field={secondaryHead} className={styles.secondaryHead} />
            </div>
            <Text field={description} className={styles.description} />
            <a className={styles.cta} href="./">
              TODO: Implement nice CTA, this one will be for Contact
            </a>
          </div>
          <div className={styles['content-right']}>
            <div className={styles['image-container']} ref={imageContainerRef}>
              <Image {...image} fill={true} className={styles.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
