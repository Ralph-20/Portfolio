import { createContext, useCallback, useContext } from 'react';

export interface GsapTimelineContextValue {
  timeline: GSAPTimeline | undefined;
}

export const GsapTimelineContext = createContext<GsapTimelineContextValue | undefined>(undefined);

export const GsapTimelineProvider = ({
  timeline,
  children,
}: {
  timeline: GsapTimelineContextValue['timeline'];
  children: React.ReactNode;
}) => {
  return (
    <GsapTimelineContext.Provider value={{ timeline }}>{children}</GsapTimelineContext.Provider>
  );
};

export const useGsapTimeline = () => {
  const context = useContext(GsapTimelineContext);
  if (context === undefined) {
    throw new Error('useGSAPTimeline must be used within a ContextProvider');
  }

  const addToTimeline = useCallback(
    (animation: GSAPTween | GSAPTimeline, position?: gsap.Position, delay?: number) => {
      if (context.timeline) {
        if (typeof position === 'string') {
          context.timeline.add(animation, position);
        } else if (typeof position === 'number') {
          context.timeline.add(animation, (position || 0) * (delay || 1));
        } else {
          console.log('adding to timeline from useGSAP');
          context.timeline.add(animation);
        }
      }
    },
    [context.timeline]
  );

  return {
    masterTimeline: context.timeline,
    addToTimeline,
  };
};

