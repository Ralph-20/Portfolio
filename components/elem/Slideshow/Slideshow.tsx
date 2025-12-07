'use client';

import cn from 'classnames';
import styles from './SlideShow.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import '../../node_modules/swiper/swiper.scss'; // Import Swiper styles
import '../../node_modules/swiper/swiper-bundle.min.css'; // Import Swiper styles change
//this later to only modules that I need for efficiency
import { Navigation, Pagination } from 'swiper/modules';
import { TImageData } from '@/types';
import Image from 'next/image';

register();

export type SlideShowProps = {
  images: TImageData[];
};

const SlideShow = (props: SlideShowProps): React.JSX.Element => {
  const { images } = props;

  if (!images) {
    return <></>;
  }

  return (
    <div className={styles.main}>
      <div className={styles['container']}>
        <Swiper
          centeredSlides={true}
          initialSlide={0}
          height={500}
          loop={true}
          modules={[Navigation, Pagination]}
          navigation={true}
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className={cn('swiper-slide', styles['swiper-slide'], styles.slide)}
            >
              <Image fill={true} className={styles.img} src={image.src} alt={image.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SlideShow;
