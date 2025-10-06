import styles from './Header.module.scss';
import { Tlink } from '@/types';
import NavTab from '../NavTab';
import Image from 'next/image';
import Link from 'next/link';

export type HeaderProps = {
  // logo: ImageData;
  tabs: Tlink[];
};

const Header = ({ tabs }: HeaderProps): JSX.Element => {
  return (
    <div className={styles.main}>
      <Link href="#" className={styles['logo-container']}>
        <Image
          src="/images/LJRDev.png"
          alt="LJR Dev Logo"
          width={180}
          height={45}
          priority
          className={styles.logo}
        />
      </Link>
      <span className={styles['tabs-container']}>
        {tabs.map((tab, index) => (
          <NavTab key={index} tab={tab} />
        ))}
      </span>
    </div>
  );
};

export default Header;
