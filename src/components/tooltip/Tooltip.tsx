"use client";
import React, { useEffect, useRef, useState } from 'react';
import { placeTooltip } from '../../utils/tooltipPlacement';
import { TooltipProps } from '../../models/interfaces';
import styles from './Tooltip.module.css';

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  forcePosition = false,
  alternateText,
  showAlternate = false,
  tooltipClassName = '',
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const show = () => {
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
  };
  
  const hide = () => {
    setIsVisible(false);
  };

  // Escape dismisses a visible tooltip without moving the pointer or focus
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVisible(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isVisible]);

  const tipRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isVisible) placeTooltip(tipRef.current);
  }, [isVisible, tooltipPosition]);

  const displayText = showAlternate && alternateText ? alternateText : text;
  
  return (
    <div 
      ref={containerRef}
      className={`${styles.tooltipContainer}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={(e) => {
        if (e.target.matches(':focus-visible')) show();
      }}
      onBlur={hide}
    >
      {children}
      {isVisible && !disabled && (
        <div ref={tipRef} role="tooltip" className={`${styles.tooltip} ${styles[tooltipPosition]} ${tooltipClassName}`}>
          {displayText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
