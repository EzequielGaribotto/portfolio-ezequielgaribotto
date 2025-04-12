"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useTranslation } from "../context/TranslationContext";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, altText }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // Get theme information from context
  const { theme } = useTranslation();

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  // Don't render anything if not open
  if (!isOpen) return null;
  
  // Use portal to render outside of component hierarchy
  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} // Clicking outside closes the modal
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={modalRef}
        className="relative bg-transparent p-2 max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="relative">
          <Image
            src={imageUrl}
            alt={altText}
            width={800}
            height={600}
            className="object-contain rounded-lg max-h-[85vh] max-w-full"
            priority
          />
          
          {/* Theme-aware close button */}
          <button
            className={`absolute top-2 right-2 p-2 rounded-full transition 
              ${theme === 'dark' 
                ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'}`}
            onClick={(e) => {
              e.stopPropagation(); 
              onClose();
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
