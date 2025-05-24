"use client";
import React, { useState } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  alternateText?: string;
  showAlternate?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  forcePosition?: boolean; // New prop to force position regardless of screen position
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  className = '',
  alternateText,
  showAlternate = false,
  onMouseEnter,
  onMouseLeave,
  forcePosition = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = () => {
    setIsVisible(true);
    
    // Only check for position adjustment if not forcing position
    if (!forcePosition && containerRef.current && position === 'top') {
      const rect = containerRef.current.getBoundingClientRect();
      // If too close to the top of the viewport, show below instead
      if (rect.top < 70) { // 70px threshold for header
        setTooltipPosition('bottom');
      } else {
        setTooltipPosition(position);
      }
    }
    
    if (onMouseEnter) onMouseEnter();
  };
  
  const handleMouseLeave = () => {
    setIsVisible(false);
    if (onMouseLeave) onMouseLeave();
  };
  
  const displayText = showAlternate && alternateText ? alternateText : text;
  
  return (
    <div 
      ref={containerRef}
      className={`${styles.tooltipContainer} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[tooltipPosition]}`}>
          {displayText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
