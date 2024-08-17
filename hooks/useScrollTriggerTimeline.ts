import { useRef, useState } from 'react';

import { gsap } from '@/utils/gsap';

import { useGSAP } from '@gsap/react';
import { useImagesLoaded } from './useImagesLoaded';

export const useScrollTriggerTimeline = <TElement extends HTMLElement = HTMLDivElement>(
  scrollTriggerOptions: ScrollTrigger.Vars = {},
  timelineOptions: GSAPTimelineVars = {}
) => {
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [timeline, setTimeline] = useState<GSAPTimeline>();

  const scrollTriggerRef = useRef<TElement>(null);
  const { isImagesLoaded } = useImagesLoaded(scrollTriggerRef);

  useGSAP(
    () => {
      if (!isImagesLoaded) return;
      setTimeline(
        gsap.timeline({
          scrollTrigger: {
            ...scrollTriggerOptions,
            trigger: scrollTriggerRef.current,
            onToggle: (scrollTriggerInstance) => {
              setInView(scrollTriggerInstance.isActive);

              if (scrollTriggerInstance.isActive && hasTriggered === false) {
                setHasTriggered(true);
              }

              if (scrollTriggerOptions.onToggle) {
                scrollTriggerOptions.onToggle(scrollTriggerInstance);
              }
            },
          },
          ...timelineOptions,
        })
      );
    },
    { dependencies: [isImagesLoaded] }
  );

  return {
    /**
     * Boolean to indicate if the scrollTriggerRef is in view
     */
    inView,
    /**
     * Boolean to indicate if the scrollTriggerRef was ever in view. Once set to true, it will remain true.
     */
    hasTriggered,
    /**
     * GSAP timeline
     */
    timeline,
    /**
     * ref of the element to be used as the trigger for scrollTrigger
     */
    scrollTriggerRef,
  };
};

