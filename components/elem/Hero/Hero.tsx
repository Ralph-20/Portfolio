import cn from 'classnames';
import styles from './Hero.module.scss';

export type HeroProps = {
  primaryHeading: string;
  secondaryHeading: string;
};

const Hero = (props: HeroProps): JSX.Element => {
  return (
    <div className={cn('spacer-L', styles.main)}>
      <div>Hero</div>
    </div>
  );
};

export default Hero;
