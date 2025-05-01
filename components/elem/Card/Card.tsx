import cn from 'classnames';
import styles from './Card.module.scss';
import { CardProps } from '@/types';
import Text from '@/components/helpers/Text';
import Image from 'next/image';

const Card = (props: CardProps): JSX.Element => {
  const { heading, eyebrow, description, image } = props || {};

  return (
    <div className={cn(styles.main)}>
      <div className={styles['img-container']}>
        <Image {...image} className={cn(styles.image)} />
      </div>
      <Text field={heading} tag="h4" className={styles.heading} />
      <Text field={eyebrow} tag="p" className={styles.eyebrow} />
      <Text field={description} tag="p" className={styles.description} />
    </div>
  );
};

export default Card;
