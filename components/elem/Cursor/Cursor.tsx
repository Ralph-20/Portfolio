import styles from './Cursor.module.scss';
import { useRef } from 'react';
import { gsap } from '../../../utils/gsap';
import cn from 'classnames';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

const Cursor = (): JSX.Element => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context>();

  const mouseMove = (e: MouseEvent) => {
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3' }),
      yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3' });
    const cursorWidth = cursorRef.current?.clientWidth || 0;
    xTo(e.clientX - cursorWidth / 2); // to center the cursor
    yTo(e.clientY - cursorWidth / 2); // to center the cursor
  };
  const mouseDown = () => {
    gsap.to(cursorRef.current, {
      scale: 2,
    });
  };
  const mouseUp = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
    });
  };

  useIsomorphicLayoutEffect(() => {
    var isMobile = /Mobi/i.test(window.navigator.userAgent);
    if (isMobile) return;
    ctx.current = gsap.context(() => {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mousedown', mouseDown);
      window.addEventListener('mouseup', mouseUp);
    });
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      ctx.current?.revert();
    };
  }, [cursorRef]);

  return <div ref={cursorRef} className={cn(styles['cursor'])}></div>;
};

export default Cursor;
