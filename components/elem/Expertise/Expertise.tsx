import cn from 'classnames';
import styles from './Expertise.module.scss';
import Text from '@/components/helpers/Text';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/utils/gsap';

export type ExpertiseProps = {
  headline: string;
  subHeadline?: string;
  items: {
    title: string;
    description: string;
    company?: string;
    period: string;
    location: string;
    icon?: string;
  }[];
};

const Expertise = (props: ExpertiseProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { headline, subHeadline, items } = props || {};

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null);

  // TODO: add fade up animation similar to button hover, and add in description in a similar hover state manner

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          end: 'top bottom',
          toggleActions: 'restart none none reset',
          once: false,
        },
      });
      const splitPrimary = new SplitText(headingRef.current, { type: 'chars, words, lines' });
      const splitSecondary = new SplitText(subHeadingRef.current, { type: 'chars, words, lines' });
      const items = gsap.utils.toArray(`.${styles.item}`); // safer than targeting <li> directly

      gsap.set(items, { opacity: 0, y: 50 });
      gsap.set(splitPrimary.chars, {
        y: 150,
      });
      gsap.set(splitSecondary.chars, {
        y: 150,
      });

      tl.to(splitPrimary.chars, {
        delay: 0.25,
        y: 0,
        stagger: 0.03,
        duration: 0.25,
      });
      tl.to(splitSecondary.chars, {
        y: 0,
        stagger: 0.03,
        duration: 0.25,
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: 'power2.out',
      });
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <section id="experience">
      <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
        <div className={cn('container-10', styles.wrapper)}>
          <div className={styles.container}>
            <div className={styles['header-container']}>
              <Text field={headline} ref={headingRef} tag="h3" className={styles.heading} />
              {subHeadline && (
                <Text field={subHeadline} className={styles.subhead} ref={subHeadingRef} />
              )}
            </div>
            <ul className={styles.list}>
              {items?.map((item, index) => (
                <li key={index}>
                  <a
                    className={styles.item}
                    href="https://www.linkedin.com/company/one-north-interactive/"
                  >
                    <div className={styles['item--left']}>
                      <Text field={item.title} className={styles['label']} />
                      <div className={styles['desc-container']}>
                        {item.company && <Text field={item.company} className={styles.company} />}
                        <Text field={item.description} className={styles.description} />
                      </div>
                    </div>
                    <div className={styles['item--right']}>
                      <Text field={item.period} className={styles.date} />
                      <Text field={item.location} className={styles.location} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
