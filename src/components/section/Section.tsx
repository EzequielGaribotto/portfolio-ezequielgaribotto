import React from 'react';
import styles from './Section.module.css';
import { SectionProps } from '../../models/interfaces';

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false,
  backgroundColor,
  titleAlign = 'left',
  maxWidth = "1200px" // Default width value
}) => {
  // Only apply custom style if explicitly provided, otherwise use CSS variables
  const style = backgroundColor ? { 
    backgroundColor,
    transition: 'none',
  } : undefined;
  
  const containerStyle = {
    maxWidth: maxWidth,
    width: '100%', // Ensure width is always 100% of the parent
    margin: '0 auto', // Center the container
  };
  
  return (
    <section 
      id={id}
      className={`${styles.section} ${className}`}
      style={style}
    >
      <div 
        className={fullWidth ? styles.fullWidthContainer : styles.container}
        style={containerStyle}
      >
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
