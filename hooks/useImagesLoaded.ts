import { RefObject, useEffect, useState } from 'react';

import { hasItems } from '@/utils/hasItems';

export const useImagesLoaded = <TElement extends HTMLElement = HTMLDivElement>(
  ref: RefObject<TElement>
) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  useEffect(() => {
    const domImages = Array.from(ref?.current?.querySelectorAll('img') || []);

    let timeoutTriggered = false; // to prevent callback from being called twice

    // Fallback: Call the callback after 3 seconds regardless of image loading status
    const timeoutId = setTimeout(() => {
      timeoutTriggered = true;
      setIsImagesLoaded(true);
    }, 5000);

    if (hasItems(domImages)) {
      const unLoadedImages = domImages.filter((img) => !img.complete);
      if (unLoadedImages.length === 0) {
        setIsImagesLoaded(true);
        return;
      }
      Promise.all(
        unLoadedImages.map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
      ).then(() => {
        if (!timeoutTriggered) {
          clearTimeout(timeoutId);
        }
        setIsImagesLoaded(true);
      });
    } else {
      setIsImagesLoaded(true);
    }
  }, []);
  return {
    isImagesLoaded,
  };
};

