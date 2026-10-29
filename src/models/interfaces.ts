// Common component interfaces

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  forcePosition?: boolean;
  alternateText?: string;
  showAlternate?: boolean;
  tooltipClassName?: string;
  /** Never show the tooltip (e.g. while a menu is open on the same element). */
  disabled?: boolean;
}

export interface ClickableButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  tooltipText?: string;
  tooltipKey?: string;
  /** Visible text next to the icon; the link then needs no hover tooltip to be understood. */
  label?: string;
}

export interface EmailButtonProps {
  email: string;
  className?: string;
}

export interface CVDownloadButtonProps {
  className?: string;
  /** `primary` is the filled action; `outline` is the glass outline. */
  variant?: "primary" | "outline";
  /** Smaller pill for the header; hides the "last updated" line. */
  compact?: boolean;
}

export interface ThemeToggleButtonProps {
  className?: string;
}

export interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  backgroundColor?: string;
  titleAlign?: 'left' | 'center' | 'right';
  maxWidth?: string;  // Added new prop for maxWidth
}
