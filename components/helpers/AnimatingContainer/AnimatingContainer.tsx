import { useGSAP } from '@gsap/react';
import { useRef, useState, createElement } from 'react';
import 'react';

import { useGsapTimeline } from '@/hooks/useGSAPTimeline';

import { gsap } from '@/utils/gsap';

export type AnimatingContainerProps = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  position?: gsap.Position;
  stagger?: number;
};

const AnimatingContainer = ({
  children,
  position,
  tag = 'div',
  className,
  stagger = 0,
}: AnimatingContainerProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { addToTimeline, masterTimeline } = useGsapTimeline();
  const [played, setPlayed] = useState<boolean>(false);

  useGSAP(
    () => {
      if (played) {
        return;
      }
      //Set the gsap styles before we have a master timeline so there is no flash of content
      let animation;
      const childrenSelector = `[data-gsap-selector] > *`;
      gsap.set(childrenSelector, { autoAlpha: 0, y: 50 });
      if (masterTimeline) {
        animation = gsap.to(childrenSelector, {
          autoAlpha: 1,
          y: 0,
          ease: 'power1.inOut',
          duration: 1.1,
          stagger: stagger,
        });
      }
      if (animation) {
        addToTimeline(animation, position);
        setPlayed(true);
      }
    },
    { dependencies: [masterTimeline], scope: containerRef }
  );
  return createElement(
    tag,
    {
      ref: containerRef,
      className,
      'data-gsap-selector': '',
    },
    children
  );
};

export default AnimatingContainer;

