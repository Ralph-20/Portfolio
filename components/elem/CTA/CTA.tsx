import cn from 'classnames';
import styles from './CTA.module.scss';
import { Tlink } from '@/types';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
// import { useGsapTimeline } from '@/hooks/useGSAPTimeline';

// TODO: create anchor or link util component, extend that here instead of simply a link
export type CTAProps = Tlink & {
  className?: string;
  children?: React.ReactNode; // Added children prop to allow for additional content
  ref?: React.Ref<HTMLAnchorElement>; // Added ref prop for forwarding refs if needed
};

const CTA = (props: CTAProps): JSX.Element => {
  const { ref, label, href, className, children } = props || {};

  const containerRef = useRef<HTMLAnchorElement>(null);

  // const { addToTimeline, masterTimeline } = useGsapTimeline();

  useGSAP(
    () => {
      return;
    },
    { scope: containerRef }
  );

  return (
    <Link ref={containerRef} href={href} className={cn(styles.main, className)}>
      <span className={styles.text}>{label}</span>
      {children}
      <span className={cn(styles['hidden-label'], styles.text)}>{label}</span>
    </Link>
  );
};

export default CTA;
