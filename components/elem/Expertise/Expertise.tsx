import cn from 'classnames';
import styles from './Expertise.module.scss';
import Text from '@/components/helpers/Text';
import { useRef } from 'react';

export type ExpertiseProps = {
  headline: string;
  subHeadline?: string;
  items: {
    title: string;
    description: string;
    company?: string;
    period: string;
    location: string;
    icon?: string;
  }[];
};

const Expertise = (props: ExpertiseProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { headline, subHeadline, items } = props || {};

  // TODO: add fade up animation similar to button hover, and add in description in a similar hover state manner

  return (
    <div className={cn(styles.main, 'spacer-L')} ref={containerRef}>
      <div className={cn('container-10', styles.wrapper)}>
        <div className={styles.container}>
          <div className={styles['header-container']}>
            <Text field={headline} tag="h3" className={styles.heading} />
            {subHeadline && <Text field={subHeadline} className={styles.subhead} />}
          </div>
          <ul className={styles.list}>
            {items?.map((item, index) => (
              <li key={index}>
                <a
                  className={styles.item}
                  href="https://www.linkedin.com/company/one-north-interactive/"
                >
                  <div className={styles['item--left']}>
                    <Text field={item.title} className={styles['label']} />
                    <div className={styles['desc-container']}>
                      {item.company && <Text field={item.company} className={styles.company} />}
                      <Text field={item.description} className={styles.description} />
                    </div>
                  </div>
                  <div className={styles['item--right']}>
                    <Text field={item.period} className={styles.date} />
                    <Text field={item.location} className={styles.location} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
