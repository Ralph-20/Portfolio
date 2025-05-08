import cn from 'classnames';
import styles from './ContactSection.module.scss';
import Text from '@/components/helpers/Text';
import ContactForm from '@/components/elem/ContactForm';
import CTA from '../CTA';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/utils/gsap';
import { useRef } from 'react';

export type ContactSectionProps = {
  heading: string;
  subHeading: string;
  links: {
    label: string;
    href: string;
    download?: boolean;
  }[];
};

const ContactSection = (props: ContactSectionProps): JSX.Element => {
  const { heading, subHeading, links } = props || {};

  const containerRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null);

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

      gsap.set(splitPrimary.chars, { y: 100 });
      gsap.set(splitPrimary.chars, { y: 100 });
      gsap.set(contactFormRef.current, { opacity: 0, y: 20 });

      const ctaEls = gsap.utils.toArray('.cta-global') as HTMLElement[];
      gsap.set(ctaEls, { opacity: 0, y: 30 });
      const words = splitPrimary.words;
      if (words.length > 1) {
        gsap.set(words[1], { color: 'var(--colors__neon-blue)' }); // Second word
      }

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
        duration: 0.5,
      });
      tl.to(splitSecondary.chars, {
        y: 0,
        stagger: 0.03,
        duration: 0.5,
      });

      tl.to(ctaEls, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      });
      tl.to(
        contactFormRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<'
      );
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <section id="contact">
      <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
        <div className={cn('container-10', styles.wrapper)}>
          <div className={cn(styles['heading-container'])}>
            <div className={styles.left}>
              <Text ref={headingRef} field={heading} tag="h3" className={styles.heading} />
              <Text ref={subHeadingRef} field={subHeading} tag="h3" className={styles.subHeading} />
            </div>
            <div className={styles.right}>
              {links.map((link, index) => (
                <CTA
                  className={`cta-global ${styles.cta}`}
                  key={index}
                  download={link.download}
                  href={link.href}
                  label={link.label}
                  as={'link'}
                />
              ))}
            </div>
          </div>
          <div ref={contactFormRef}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
