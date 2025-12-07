'use client';

import cn from 'classnames';
import styles from './PictureCard.module.scss';
import Image from 'next/image';
import Text from '@/components/helpers/Text';
import { TImageData } from '@/types';
import { useState } from 'react';
import InfoButton from '@/components/helpers/InfoButton';

export type PictureCardProps = {
  image: TImageData;
  description: string;
  className?: string;
};

const PictureCard = ({ image, description, className }: PictureCardProps): React.JSX.Element => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className={cn(
        styles['picture-container'],
        className,

        { [styles['picture-container--active']]: showInfo }
      )}
    >
      <div className={styles['image-container']}>
        <Image {...image} className={styles.image} />
        <InfoButton
          className={styles['info-button']}
          isActive={showInfo}
          onClick={() => setShowInfo((prev) => !prev)}
        />
        <div className={styles['image-overlay']}>
          <Text field={description} tag="p" className={styles['image-desc']} />
        </div>
      </div>
    </div>
  );
};

export default PictureCard;
