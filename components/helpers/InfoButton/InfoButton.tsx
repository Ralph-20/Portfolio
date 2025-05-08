import cn from 'classnames';
import styles from './InfoButton.module.scss';
import Info from '../../../assets/svg/info.svg';

export type InfoButtonProps = {
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
};

const InfoButton = (props: InfoButtonProps): JSX.Element => {
  const { className, onClick, isActive = false } = props || {};

  return (
    <button
      onClick={onClick}
      className={cn(styles.main, className, { [styles['main--active']]: isActive })}
    >
      <Info className={styles.icon} />
    </button>
  );
};

export default InfoButton;
