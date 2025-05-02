import cn from 'classnames';
import styles from './PictureSection.module.scss';
import { TImageData } from '@/types';
import Text from '@/components/helpers/Text';
import Image from 'next/image';

export type PictureSectionProps = {
  heading: string;
  pictures: {
    image: TImageData;
    description: string;
  }[];
};

const PictureSection = (props: PictureSectionProps): JSX.Element => {
  const { heading, pictures } = props || {};

  return (
    <div className={cn(styles.main, 'spacer-L')}>
      <div className={cn('container-10', styles.wrapper)}>
        {/* TODO: Make this into a slide show */}
        {pictures?.map((picture, index) => (
          <div key={index} className={styles['picture-container']}>
            <div className={styles['image-container']}>
              <Image {...picture.image} className={styles.image} />
            </div>
            <Text field={picture.description} tag="p" className={styles['image-desc']} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureSection;
