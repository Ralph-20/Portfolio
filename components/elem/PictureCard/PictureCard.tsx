import cn from 'classnames';
import styles from './PictureCard.module.scss';
import Image from 'next/image';
import Text from '@/components/helpers/Text';
import { TImageData } from '@/types';
import { useEffect, useState } from 'react';
import InfoButton from '@/components/helpers/InfoButton';

export type PictureCardProps = {
  image: TImageData;
  description: string;
  className?: string;
};

const PictureCard = ({ image, description, className }: PictureCardProps): JSX.Element => {
  const [isTouch, setIsTouch] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  return (
    <div
      className={cn(
        styles['picture-container'],
        className,

        { [styles['picture-container--active']]: isTouch && showInfo }
      )}
    >
      <div className={styles['image-container']}>
        <Image {...image} className={styles.image} />
        {isTouch && (
          <InfoButton
            className={styles['info-button']}
            isActive={showInfo}
            onClick={() => setShowInfo((prev) => !prev)}
          />
        )}
        <div className={styles['image-overlay']}>
          <Text field={description} tag="p" className={styles['image-desc']} />
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
