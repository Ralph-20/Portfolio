import cn from 'classnames';
import styles from './CTA.module.scss';
import { Tlink } from '@/types';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export type CTAProps = Partial<Tlink> & {
  className?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; // for <button>
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  as?: 'link' | 'button'; // force element type
};

const CTA = (props: CTAProps): JSX.Element => {
  const {
    label,
    href,
    className,
    children,
    type = 'button',
    onClick,
    as = href ? 'link' : 'button',
  } = props;

  const containerRef = useRef<HTMLAnchorElement & HTMLButtonElement & HTMLDivElement>(null);

  useGSAP(() => {}, { scope: containerRef });

  const content = (
    <>
      <span className={styles.text}>{label}</span>
      {children}
      <span className={cn(styles['hidden-label'], styles.text)}>{label}</span>
    </>
  );

  if (as === 'button') {
    return (
      <button
        ref={containerRef}
        type={type}
        onClick={onClick}
        className={cn(styles.main, className)}
      >
        {content}
      </button>
    );
  }

  if (as === 'link' && href) {
    return (
      <Link ref={containerRef} href={href} className={cn(styles.main, className)}>
        {content}
      </Link>
    );
  }

  return (
    <div ref={containerRef} className={cn(styles.main, className)}>
      {content}
    </div>
  );
};

export default CTA;
