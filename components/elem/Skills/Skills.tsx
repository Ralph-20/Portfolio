import cn from 'classnames';
import styles from './Skills.module.scss';
import { CardProps } from '@/types';
import Text from '@/components/helpers/Text';
import Card from '../Card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';
import { useRef } from 'react';
import Chevron from '../../../assets/svg/chevron.svg';
import { NavigationOptions } from 'swiper/types';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/utils/gsap';

export type SkillsProps = {
  heading: string;
  cards: CardProps[];
};

const Skills = (props: SkillsProps): JSX.Element => {
  const { heading, cards } = props || {};
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
      const slideEls = gsap.utils.toArray(`.${styles.swiper} .swiper-slide`) as HTMLElement[];
      const splitPrimary = new SplitText(headingRef.current, { type: 'chars, words, lines' });
      gsap.set(headingRef.current, { opacity: 1 });
      gsap.set(slideEls, { opacity: 0, y: 50 });
      gsap.set(splitPrimary.chars, { y: 100 });
      if (prevRef.current && nextRef.current) {
        gsap.set([prevRef.current, nextRef.current], { opacity: 0, y: 20 });
      }

      const words = splitPrimary.words;
      if (words.length > 1) {
        gsap.set(words[1], { color: 'var(--colors__neon-blue)' }); // Second word
      }

      gsap.set(splitPrimary.chars, {
        y: 150,
      });

      tl.to(splitPrimary.chars, {
        delay: 0.25,
        y: 0,
        stagger: 0.03,
        duration: 0.5,
      });

      tl.to(slideEls, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: 'power2.out',
      });

      tl.to(
        [prevRef.current, nextRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.75,
        },
        '<'
      );
    },
    { dependencies: [], scope: containerRef }
  );

  return (
    <section id="skills">
      <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
        <div className={cn('container-10', styles.wrapper)}>
          <Text field={heading} ref={headingRef} tag="h3" className={styles.heading} />
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectCoverflow]}
            effect="coverflow"
            loop={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 10,
              scale: 0.9,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
              (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                initialSlide: 0,
                effect: 'slide',
              },
              768: {
                slidesPerView: 2,
                initialSlide: 1,
                effect: 'coverflow',
                coverflowEffect: {
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                },
              },
            }}
            spaceBetween={75}
            className={styles.swiper}
          >
            {cards?.map((card, index) => (
              <SwiperSlide key={index}>
                <Card
                  heading={card.heading}
                  eyebrow={card.eyebrow}
                  description={card.description}
                  image={card.image}
                />
              </SwiperSlide>
            ))}
            <div ref={prevRef} className={styles['swiper-button-prev-custom']}>
              <Chevron className={styles.arrow} />
            </div>
            <div ref={nextRef} className={styles['swiper-button-next-custom']}>
              <Chevron className={cn(styles.arrow, styles.arrowRight)} />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Skills;
