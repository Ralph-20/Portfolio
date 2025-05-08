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

export type SkillsProps = {
  heading: string;
  cards: CardProps[];
};

const Skills = (props: SkillsProps): JSX.Element => {
  const { heading, cards } = props || {};
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="skills">
      <div className={cn(styles.main, 'spacer-L')}>
        <div className={cn('container-10', styles.wrapper)}>
          <Text field={heading} tag="h3" className={styles.heading} />
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectCoverflow]}
            effect="coverflow"
            loop={true}
            centeredSlides={true}
            initialSlide={1}
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
              },
              768: {
                slidesPerView: 2,
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
