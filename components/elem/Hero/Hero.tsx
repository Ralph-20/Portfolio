import cn from 'classnames';
import styles from './Hero.module.scss';
import { TImageData } from '@/types';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap, SplitText } from '@/utils/gsap';
import CTA from '../CTA';

export type HeroProps = {
  primaryHeading: string;
  secondaryHeadings: string[];
  eyebrow: string;
  // todo: update to ImageData from nextjs
  heroImg: TImageData;
};

const Hero = (props: HeroProps): JSX.Element => {
  const { primaryHeading, secondaryHeadings, heroImg, eyebrow } = props || {};

  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const primaryTextRef = useRef<HTMLHeadingElement>(null);
  const secodaryTextRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({});
      const splitPrimary = new SplitText(primaryTextRef.current, { type: 'words, chars' });
      const splitSecondary = new SplitText(secodaryTextRef.current, { type: 'words, chars' });

      gsap.set(primaryTextRef.current, { opacity: 1 });
      gsap.set(secodaryTextRef.current, { opacity: 1 });

      // Select the second and last word
      const words = splitSecondary.words;
      if (words.length > 1) {
        tl.set(words[1], { color: 'var(--colors__neon-blue)' }); // Second word
      }
      if (words.length > 2) {
        tl.set(words[words.length - 1], { color: 'var(--colors__neon-blue)' }); // Last word
      }

      tl.fromTo(
        splitPrimary.chars,
        { opacity: 0, y: -500, rotateY: 380 },
        {
          delay: 0.75,
          opacity: 1,
          stagger: 0.12,
          y: 0,
          rotateY: 0,
          ease: 'power4.out',
          duration: 1.5,
        }
      );

      tl.fromTo(
        splitSecondary.chars,
        { opacity: 0, y: 50, rotateX: 380 },
        { opacity: 1, stagger: 0.05, y: 0, rotateX: 0, ease: 'power3', duration: 0.6 }
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power3', duration: 2, delay: 0.5 }
      );
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <div className={cn(styles.main)} ref={containerRef}>
      <div className={styles['content-container']}>
        <h1 ref={primaryTextRef} className={styles.heading}>
          {primaryHeading}
        </h1>
        <div className={styles['secondary-headings']}>
          <h2 ref={secodaryTextRef} className={styles.subheading}>
            {eyebrow}
          </h2>
          {/* TODO: make the second word and last word turqoise using gsap */}
        </div>
        <span className={styles['test']} ref={ctaRef}>
          <CTA className={styles.cta} label="View More" href={'#about'} />
        </span>
      </div>
    </div>
  );
};

export default Hero;
