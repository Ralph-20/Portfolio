import cn from 'classnames';
import styles from './About.module.scss';
import Text from '@/components/helpers/Text';
import Image, { ImageProps } from 'next/image';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap, SplitText } from '@/utils/gsap';
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
  const subHeadingRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;

      // Timeline 1: animate image on scroll
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

      // Timeline 2: animate heading text
      const splitPrimary = new SplitText(headingRef.current, { type: 'chars, words, lines' });
      const splitSecondary = new SplitText(paragraphRef.current, { type: 'lines' });

      gsap.set(splitPrimary.chars, { y: 100 });
      gsap.set(splitSecondary.lines, {
        opacity: 0,
        xPercent: -10,
      });
      gsap.set(ctaRef.current, { opacity: 0, xPercent: -10 });

      const words = splitPrimary.words;
      if (words.length > 1) {
        gsap.set(words[1], { color: 'var(--colors__neon-blue)' }); // Second word
      }

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: 'top bottom',
          toggleActions: 'restart none none reset',
          once: false,
        },
        onComplete: () => {
          splitPrimary.revert();
          splitSecondary.revert();
          tl2.current?.set({}, { clearProps: 'all' });
        },
      });

      tl2.to(splitPrimary.chars, {
        y: 0,
        stagger: 0.03,
        duration: 0.5,
      });

      tl2.to(splitSecondary.lines, {
        opacity: 1,
        xPercent: 0,
        stagger: 0.1,
      });

      tl2.to(ctaRef.current, {
        opacity: 1,
        duration: 1,
        xPercent: 0,
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section id="about">
      <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
        <div className={cn('container-10', styles.wrapper)}>
          <div className={styles.container}>
            <div className={styles['content-left']}>
              <div className={styles['heading-container']}>
                <Text ref={headingRef} field={headline} className={styles.heading} tag="h3" />
                {/* <Text ref={subHeadingRef} field={secondaryHead} className={styles.secondaryHead} /> */}
              </div>
              <Text ref={paragraphRef} field={description} className={styles.description} />
              <div ref={ctaRef}>
                <CTA className={styles.cta} {...cta} as={'link'} />
              </div>
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
