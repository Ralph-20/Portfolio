'use client';

import cn from 'classnames';
import styles from './PictureSection.module.scss';
import { TImageData } from '@/types';
import Text from '@/components/helpers/Text';
import PictureCard from '../PictureCard';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { NavigationOptions } from 'swiper/types';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/utils/gsap';
import Chevron from '../../../assets/svg/chevron.svg';

export type PictureSectionProps = {
  heading: string;
  pictures: {
    image: TImageData;
    description: string;
  }[];
};

const PictureSection = (props: PictureSectionProps): React.JSX.Element => {
  const { heading, pictures } = props || {};
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  // const paginationRef = useRef<HTMLDivElement | null>(null);
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

      const splitPrimary = new SplitText(headingRef.current, { type: 'chars, words, lines' });
      const slideEls = gsap.utils.toArray(`.${styles.swiper} .swiper-slide`) as HTMLElement[];
      if (prevRef.current && nextRef.current) {
        gsap.set([prevRef.current, nextRef.current], { opacity: 0, y: 20 });
      }

      gsap.set(slideEls, { opacity: 0, y: 50 });
      gsap.set(splitPrimary.chars, { y: 100 });

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
    <section id="gallary">
      <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
        <div className={cn('container-10', styles.wrapper)}>
          <Text field={heading} tag="h3" className={styles.heading} ref={headingRef} />
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectCoverflow]}
            centeredSlides={true}
            loop={true}
            effect="coverflow"
            initialSlide={1}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            // pagination={{
            //   el: paginationRef.current,
            //   clickable: true,
            // }}
            onBeforeInit={(swiper) => {
              (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
              (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
              // (swiper.params.pagination as PaginationOptions).el = paginationRef.current;
            }}
            breakpoints={{
              0: {
                spaceBetween: 60,
                slidesPerView: 1,
                effect: 'slide',
              },
              768: {
                spaceBetween: 30,
                slidesPerView: 2,
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
            className={styles.swiper}
          >
            {pictures?.map((picture, index) => (
              <SwiperSlide key={index}>
                <PictureCard image={picture.image} description={picture.description} />
              </SwiperSlide>
            ))}
            <div ref={prevRef} className={styles['swiper-button-prev-custom']}>
              <Chevron className={styles.arrow} />
            </div>
            <div ref={nextRef} className={styles['swiper-button-next-custom']}>
              <Chevron className={cn(styles.arrow, styles.arrowRight)} />
            </div>
            {/* <div ref={paginationRef} className={styles['swiper-pagination-custom']} /> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PictureSection;
