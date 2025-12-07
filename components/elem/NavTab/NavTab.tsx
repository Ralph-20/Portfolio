import styles from './NavTab.module.scss';
import { Tlink } from '@/types';
import Link from 'next/link';
import Text from '@/components/helpers/Text';

export type NavTabProps = {
  tab: Tlink;
};

const NavTab = ({ tab }: NavTabProps): React.JSX.Element => {
  return (
    <Link href={tab.href} className={styles.link}>
      <Text tag="span" field={tab.label} className={styles.linkLabel} />
    </Link>
  );
};

export default NavTab;
