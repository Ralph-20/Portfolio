import cn from 'classnames';
import styles from './ContactSection.module.scss';
import Text from '@/components/helpers/Text';
import ContactForm from '@/components/elem/ContactForm';

export type ContactSectionProps = {
  heading: string;
  subHeading: string;
};

const ContactSection = (props: ContactSectionProps): JSX.Element => {
  const { heading, subHeading } = props || {};

  return (
    <section id="contact">
      <div className={cn(styles.main, 'spacer-L')}>
        <div className={cn('container-10', styles.wrapper)}>
          <div className={cn('heading-container')}>
            <Text field={heading} tag="h3" className={styles.heading} />
            <Text field={subHeading} tag="h3" className={styles.subHeading} />
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
