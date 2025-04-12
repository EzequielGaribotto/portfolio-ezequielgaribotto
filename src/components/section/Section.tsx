import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  backgroundColor?: string;
  titleAlign?: 'left' | 'center' | 'right';
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false,
  backgroundColor,
  titleAlign = 'left'
}) => {
  return (
    <section 
      id={id}
      className={`${styles.section} ${className}`}
      style={{ backgroundColor }}
    >
      <div className={fullWidth ? styles.fullWidthContainer : styles.container}>
        <div className={styles.titleWrapper} style={{ textAlign: titleAlign }}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
