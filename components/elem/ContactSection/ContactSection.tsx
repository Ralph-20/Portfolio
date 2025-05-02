import cn from 'classnames';
import styles from './ContactSection.module.scss';
import Text from '@/components/helpers/Text';

export type ContactSectionProps = {
  heading: string;
  subHeading: string;
};

const ContactSection = (props: ContactSectionProps): JSX.Element => {
  const { heading, subHeading } = props || {};

  return (
    <div className={cn(styles.main, 'spacer-L')}>
      <div className={cn('container-10', styles.wrapper)}>
        <Text field={heading} tag="h3" className={styles.heading} />
        <Text field={subHeading} tag="h3" className={styles.subHeading} />
        {/* TODO: add in form here */}
      </div>
    </div>
  );
};

export default ContactSection;
