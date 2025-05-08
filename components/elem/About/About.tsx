import cn from 'classnames';
import styles from './About.module.scss';
import Text from '@/components/helpers/Text';
import Image, { ImageProps } from 'next/image';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from '@/utils/gsap';
import CTA from '../CTA';

export type AboutProps = {
  headline: string;
  secondaryHead: string;
  description: string;
  image: ImageProps;
  cta: {
    label: string;
    href: string;
  };
};

const About = (props: AboutProps): JSX.Element => {
  const { headline, secondaryHead, description, image, cta } = props || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window && window.matchMedia('(max-width: 767px)').matches;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? '-=500' : 'top center',
          end: isMobile ? 'top top' : 'center center',
          scrub: isMobile ? false : 5,
        },
      });

      tl.fromTo(
        imageContainerRef.current,
        { opacity: 0, yPercent: 100 },
        { opacity: 1, yPercent: 0, duration: 2 }
      );
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <section id="about">
      <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
        <div className={cn('container-10', styles.wrapper)}>
          <div className={styles.container}>
            <div className={styles['content-left']}>
              <div className={styles['heading-container']}>
                <Text field={headline} className={styles.heading} />
                <Text field={secondaryHead} className={styles.secondaryHead} />
              </div>
              <Text field={description} className={styles.description} />
              <CTA className={styles.cta} {...cta} as={'link'} />
            </div>
            <div className={styles['content-right']}>
              <div className={styles['image-container']} ref={imageContainerRef}>
                <Image {...image} fill={true} className={styles.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
