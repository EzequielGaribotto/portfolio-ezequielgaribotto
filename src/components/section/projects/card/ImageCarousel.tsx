"use client";

import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaExpand, FaPause, FaPlay } from "react-icons/fa";
import { useTranslation } from "../../../../context/TranslationContext";
import { usePrefersReducedMotion } from "../../../../hooks/usePrefersReducedMotion";
import OptimizedImage from '../../../OptimizedImage';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
  images: string[];
  projectTitle: string;
  onExpand?: (imageIndex: number) => void;
}

export default function ImageCarousel({ images, projectTitle, onExpand }: ImageCarouselProps) {
  const { t } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Slideshow stops on its own while hovered, focused, offscreen or hidden; `playing` is the visitor's switch.
  const [playing, setPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [images.length]);

  const autoplay = images.length > 1 && playing && !reducedMotion && !isPaused && !hasFocus && inView;

  // Auto-slide functionality
  useEffect(() => {
    if (!autoplay) return;

    intervalRef.current = setInterval(() => {
      if (!document.hidden) setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, images.length]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // Expand the current image
    if (onExpand) {
      e.preventDefault();
      e.stopPropagation();
      onExpand(currentIndex);
    }
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
          aria-label={t("tooltips.expandImage")}
        >
          <FaExpand size={16} />
        </button>
        <OptimizedImage
          src={images[0]}
          alt={t("carousel.imageAlt").replace("{title}", projectTitle).replace("{n}", "1")}
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
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHasFocus(false);
      }}
    >
      <button 
        className={styles.expandControl} 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onExpand) {
            onExpand(currentIndex);
          }
        }}
        aria-label={t("tooltips.expandImage")}
      >
        <FaExpand size={16} />
      </button>
      
      {!reducedMotion && (
        <button
          type="button"
          className={styles.playControl}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPlaying((value) => !value);
          }}
          aria-label={playing ? t("carousel.pause") : t("carousel.play")}
        >
          {playing ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>
      )}

      <div className={styles.imagesWrapper}>
        <div 
          className={styles.imagesTrack}
          aria-live={autoplay ? "off" : "polite"}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: reducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageSlide}>
              {/* Blurred copy of the screenshot fills the sides, so the full phone image fits without black bars */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" aria-hidden="true" className={styles.slideBackdrop} loading="lazy" />
              <OptimizedImage
                src={image}
                alt={t("carousel.imageAlt").replace("{title}", projectTitle).replace("{n}", String(index + 1))}
                width={600}
                height={400}
                className="rounded-lg cursor-pointer"
                loading="lazy"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 600px"
                quality={75}
                onClick={handleImageClick}
                style={{ userSelect: 'none' }}
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
        aria-label={t("carousel.previous")}
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
        aria-label={t("carousel.next")}
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
            aria-label={t("carousel.goTo").replace("{n}", String(index + 1))}
          />
        ))}
      </div>
    </div>
  );
}
