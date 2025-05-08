import cn from 'classnames';
import styles from './ContactSection.module.scss';
import Text from '@/components/helpers/Text';
import ContactForm from '@/components/elem/ContactForm';
import CircleCTA from '../CircleCTA';
import CTA from '../CTA';

export type ContactSectionProps = {
  heading: string;
  subHeading: string;
  links: {
    label: string;
    href: string;
    download?: boolean;
  }[];
};

const ContactSection = (props: ContactSectionProps): JSX.Element => {
  const { heading, subHeading, links } = props || {};

  return (
    <section id="contact">
      <div className={cn(styles.main, 'spacer-L')}>
        <div className={cn('container-10', styles.wrapper)}>
          <div className={cn(styles['heading-container'])}>
            <div className={styles.left}>
              <Text field={heading} tag="h3" className={styles.heading} />
              <Text field={subHeading} tag="h3" className={styles.subHeading} />
            </div>
            <div className={styles.right}>
              {links.map((link, index) => (
                <CTA
                  className={styles.cta}
                  key={index}
                  download={link.download}
                  href={link.href}
                  label={link.label}
                  as={'link'}
                />
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
