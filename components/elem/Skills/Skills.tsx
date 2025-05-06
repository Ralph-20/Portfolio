import cn from 'classnames';
import styles from './Skills.module.scss';
import { TImageData, CardProps } from '@/types';
import Text from '@/components/helpers/Text';
import Card from '../Card';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';

export type SkillsProps = {
  heading: string;
  cards: CardProps[];
};

const Skills = (props: SkillsProps): JSX.Element => {
  const { heading, cards } = props || {};

  return (
    <div className={cn(styles.main, 'spacer-L')}>
      <div className={cn('container-10', styles.wrapper)}>
        <Text field={heading} tag="h3" className={styles.heading} />
        <Swiper
          modules={[Navigation, Pagination, A11y, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          initialSlide={1}
          coverflowEffect={{
            rotate: 30,
            stretch: 15,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          // navigation={{
          //   prevEl: prevRef.current,
          //   nextEl: nextRef.current,
          // }}
          // onBeforeInit={(swiper) => {
          //   swiper.params.navigation = {
          //     prevEl: prevRef.current,
          //     nextEl: nextRef.current,
          //   };
          // }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={120}
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
        </Swiper>
      </div>
    </div>
  );
};

export default Skills;
