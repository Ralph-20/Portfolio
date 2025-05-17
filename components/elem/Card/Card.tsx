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
  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useGSAP(
    () => {
      if (isTouchDevice) return;
      const container = containerRef.current;
      const shine = shineRef.current;

      if (!container || !shine) return;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Card transform
        const rotateX = -((y - centerY) / rect.height) * 20;
        const rotateY = ((x - centerX) / rect.width) * 20;
        const translateX = ((x - centerX) / rect.width) * 2;
        const translateY = ((y - centerY) / rect.height) * 2;

        gsap.to(container, {
          xPercent: translateX,
          yPercent: translateY,
          rotateX,
          rotateY,
          transformPerspective: 1000,
          transformOrigin: 'center',
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
          ease: 'power2.out',
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
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            className={cn(styles.image)}
            {...(image.fill
              ? {
                  fill: true,
                  sizes: '(max-width: 768px) 100vw, 400px',
                }
              : {
                  width: image.width,
                  height: image.height,
                })}
          />
        )}
      </div>
      <Text field={heading} tag="h4" className={styles.heading} />

      <Text field={description} tag="p" className={styles.description} />
    </div>
  );
};

export default Card;
