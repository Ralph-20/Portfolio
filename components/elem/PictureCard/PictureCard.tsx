import cn from 'classnames';
import styles from './PictureCard.module.scss';
import Image from 'next/image';
import Text from '@/components/helpers/Text';
import { TImageData } from '@/types';

export type PictureCardProps = {
  image: TImageData;
  description: string;
  className?: string;
};

const PictureCard = ({ image, description, className }: PictureCardProps): JSX.Element => {
  return (
    <div className={cn(styles['picture-container'], className)}>
      <div className={styles['image-container']}>
        <Image {...image} className={styles.image} />
        <div className={styles['image-overlay']}>
          <Text field={description} tag="p" className={styles['image-desc']} />
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
