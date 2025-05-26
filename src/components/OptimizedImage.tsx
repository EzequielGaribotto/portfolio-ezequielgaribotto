"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
  lowQualitySrc?: string;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/projects/fallback.jpg",
  lowQualitySrc,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw",
  width,
  height,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  
  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  // Add default style to maintain aspect ratio
  const combinedStyle = {
    height: "auto", // This ensures aspect ratio is maintained
    ...style
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      {isLoading && lowQualitySrc && (
        <Image
          src={lowQualitySrc}
          alt={`Low quality placeholder for ${alt}`}
          fill
          className="absolute inset-0 blur-sm scale-105"
          priority
          sizes={sizes}
        />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        sizes={sizes}
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        width={width}
        height={height}
        style={combinedStyle}
      />
    </div>
  );
}
