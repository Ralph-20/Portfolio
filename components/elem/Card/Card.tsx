import cn from 'classnames';
import styles from './Card.module.scss';
import { CardProps } from '@/types';
import Text from '@/components/helpers/Text';
import Image from 'next/image';
import { gsap } from '@/utils/gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const Card = (props: CardProps): JSX.Element => {
  const { heading, eyebrow, description, image } = props || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const shine = shineRef.current;

      if (!container || !shine) return;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // TODO: add in a variant that can have a bg image by doing something similar to the following

        // Future parallax effect for a bg image
        // const parallaxX = (window.innerWidth / 2 - event.pageX) / 20;
        // const parallaxY = (window.innerHeight / 2 - event.clientY) / 20;
        // background.style.transform = `translate(calc(${parallaxX}px - 50%), calc(${parallaxY}px - 50%))`;

        // Card transform
        const rotateX = -((y - centerY) / rect.height) * 15;
        const rotateY = ((x - centerX) / rect.width) * 15;
        const translateX = ((x - centerX) / rect.width) * 1.5;
        const translateY = ((y - centerY) / rect.height) * 1.5;

        gsap.to(container, {
          transform: `translate3d(${translateX}%, ${translateY}%, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          duration: 0.25,
        });

        // Shine effect
        const mouseX = x / rect.width;
        const mouseY = y / rect.height;
        const shineX = mouseX * -25 + 15;
        const shineY = mouseY * -25 + 15;
        const opacity = Math.max(0.1, mouseX + mouseY);
        const scale = 1 + opacity * 0.1;

        gsap.to(shine, {
          x: `${shineX}%`,
          y: `${shineY}%`,
          opacity,
          scale,
          duration: 0.25,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(container, {
          transform: 'none',
          duration: 0.5,
        });
        gsap.to(shine, {
          x: '0%',
          y: '0%',
          opacity: 0.5,
          scale: 1,
          duration: 0.5,
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef} className={cn(styles.main)}>
      <div ref={shineRef} className={styles.shine} />
      <Text field={eyebrow} tag="p" className={styles.eyebrow} />
      <div className={styles['img-container']}>
        <Image {...image} className={cn(styles.image)} />
      </div>
      <Text field={heading} tag="h4" className={styles.heading} />

      <Text field={description} tag="p" className={styles.description} />
    </div>
  );
};

export default Card;
