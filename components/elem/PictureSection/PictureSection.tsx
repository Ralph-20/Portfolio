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

import Chevron from '../../../assets/svg/chevron.svg';

export type PictureSectionProps = {
  heading: string;
  pictures: {
    image: TImageData;
    description: string;
  }[];
};

const PictureSection = (props: PictureSectionProps): JSX.Element => {
  const { heading, pictures } = props || {};
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  // const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn(styles.main, 'spacer-L')}>
      <div className={cn('container-10', styles.wrapper)}>
        <Text field={heading} tag="h3" className={styles.heading} />
        <Swiper
          modules={[Navigation, Pagination, A11y, EffectCoverflow]}
          effect={'coverflow'}
          centeredSlides={true}
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
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
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
  );
};

export default PictureSection;
