import { gsap } from 'gsap';

import SplitText from 'gsap/dist/SplitText';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger, gsap);

export * from 'gsap';
export { SplitText, ScrollTrigger };

