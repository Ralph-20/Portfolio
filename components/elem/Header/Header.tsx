import styles from './Header.module.scss';
import { Tlink } from '@/types';
import NavTab from '../NavTab';

export type HeaderProps = {
  // logo: ImageData;
  tabs: Tlink[];
};

const Header = ({ tabs }: HeaderProps): JSX.Element => {
  return (
    <div className={styles.main}>
      <span className={styles['tabs-container']}>
        {tabs.map((tab, index) => (
          <NavTab key={index} tab={tab} />
        ))}
      </span>
    </div>
  );
};

export default Header;
