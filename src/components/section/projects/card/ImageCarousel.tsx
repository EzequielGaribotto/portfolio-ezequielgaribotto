"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
import OptimizedImage from '../../../OptimizedImage';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: string[];
  projectTitle: string;
  onExpand?: (imageIndex: number) => void;
}

export default function ImageCarousel({ images, projectTitle, onExpand }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length <= 1 || isPaused || isDragging) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, isPaused, isDragging]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // Only expand if we haven't dragged
    if (onExpand && !hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      onExpand(currentIndex);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (images.length <= 1) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.clientX);
    setDragOffset(0);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const offset = currentX - startX;
    setDragOffset(offset);
    
    // If we've moved more than 5px, consider it a drag
    if (Math.abs(offset) > 5) {
      setHasDragged(true);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Threshold for slide change (25% of container width)
    const threshold = containerRef.current ? containerRef.current.offsetWidth * 0.25 : 100;
    
    if (hasDragged) {
      if (dragOffset > threshold) {
        prevImage();
      } else if (dragOffset < -threshold) {
        nextImage();
      }
    }
    
    setDragOffset(0);
    
    // Reset drag state after a short delay
    setTimeout(() => setHasDragged(false), 100);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const offset = currentX - startX;
    setDragOffset(offset);
    
    if (Math.abs(offset) > 5) {
      setHasDragged(true);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = containerRef.current ? containerRef.current.offsetWidth * 0.25 : 100;
    
    if (hasDragged) {
      if (dragOffset > threshold) {
        prevImage();
      } else if (dragOffset < -threshold) {
        nextImage();
      }
    }
    
    setDragOffset(0);
    setTimeout(() => setHasDragged(false), 100);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (images.length === 0) return null;

  // If only one image, show simple image without carousel controls
  if (images.length === 1) {
    return (
      <div className={styles.singleImageContainer}>
        <button 
          className={styles.expandControl} 
          onClick={handleImageClick}
          aria-label="Expand image"
        >
          <FaExpand size={16} />
        </button>
        <OptimizedImage
          src={images[0]}
          alt={`${projectTitle} image`}
          width={600}
          height={400}
          className="rounded-lg cursor-pointer"
          loading="lazy"
          sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
          quality={75}
          onClick={handleImageClick}
        />
      </div>
    );
  }

  // Multiple images - show carousel
  return (
    <div 
      ref={containerRef}
      className={`${styles.carouselContainer} ${isPaused ? styles.paused : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button 
        className={styles.expandControl} 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onExpand && !hasDragged) {
            onExpand(currentIndex);
          }
        }}
        aria-label="Expand image"
      >
        <FaExpand size={16} />
      </button>
      
      <div className={styles.imagesWrapper}>
        <div 
          className={styles.imagesTrack}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageSlide}>
              <OptimizedImage
                src={image}
                alt={`${projectTitle} image ${index + 1}`}
                width={600}
                height={400}
                className="rounded-lg cursor-pointer"
                loading="lazy"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
                quality={75}
                onClick={handleImageClick}
                style={{ userSelect: 'none', pointerEvents: isDragging ? 'none' : 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevImage();
        }}
        aria-label="Previous image"
      >
        <FaChevronLeft size={16} />
      </button>
      
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextImage();
        }}
        aria-label="Next image"
      >
        <FaChevronRight size={16} />
      </button>

      {/* Dots indicator */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
