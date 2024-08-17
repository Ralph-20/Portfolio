import cn from 'classnames';
import { forwardRef, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import { useGsapTimeline } from '@/hooks/useGSAPTimeline';

import { SplitText, gsap } from '@/utils/gsap';
import Text, { TextProps } from '../Text';

import styles from './AnimatingText.module.scss';

export type AnimatingTextProps = {
  splitBy: 'chars' | 'lines';
  position?: gsap.Position;
  className?: string;
} & TextProps;

const AnimatingText = forwardRef<HTMLElement, AnimatingTextProps>(function AnimatedInTextComponent(
  props: AnimatingTextProps,
  forwardedRef
): JSX.Element {
  const { splitBy, position, ...restProps } = props;

  const ref = useRef<HTMLElement>(null);
  const textRef = forwardedRef && typeof forwardedRef === 'object' ? forwardedRef : ref;

  const { addToTimeline, masterTimeline } = useGsapTimeline();
  const [played, setPlayed] = useState<boolean>(false);

  useGSAP(
    () => {
      if (played) {
        return;
      }
      const splitText = new SplitText(textRef.current, {
        type: 'chars, words, lines',
      });

      let animation;

      if (splitBy === 'chars') {
        if (masterTimeline) {
          masterTimeline.set(splitText.chars, {
            opacity: 0,
            x: 10,
            rotateX: 180,
          });
          animation = gsap.to(splitText.chars, {
            duration: 0.1,
            stagger: 0.05,
            x: 0,
            rotateX: 0,
            opacity: 1,
          });
        }
      } else if (splitBy === 'lines') {
        if (masterTimeline) {
          masterTimeline.set(splitText.lines, {
            opacity: 0,
            rotateX: 100,
            y: 100,
          });
          animation = gsap.to(splitText.lines, {
            duration: 1,
            ease: 'power2.out',
            stagger: 0.2,
            rotateX: 0,
            opacity: 1,
            y: 0,
          });
        }
      }
      if (animation) {
        addToTimeline(animation, position);
        setPlayed(true);
      }
    },
    { dependencies: [masterTimeline] }
  );
  if (ref) {
    return <Text {...restProps} className={cn(styles['main'], props.className)} ref={textRef} />;
  }
  return <></>;
});

export default AnimatingText;

