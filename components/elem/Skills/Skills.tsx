import cn from 'classnames';
import styles from './Skills.module.scss';
import { TImageData, CardProps } from '@/types';
import Text from '@/components/helpers/Text';
import Card from '../Card';

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
        <div className={styles['card-container']}>
          {cards?.map((card, index) => (
            <Card
              key={index}
              heading={card.heading}
              eyebrow={card.eyebrow}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
