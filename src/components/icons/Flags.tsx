import React from "react";

interface FlagProps {
  size?: number;
}

const frame = (size: number, children: React.ReactNode, id: string) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id={id}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
    </defs>
    <g clipPath={`url(#${id})`}>{children}</g>
    <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
  </svg>
);

/** Spain: red, yellow, red in 1:2:1 bands, cropped to a circle. */
export function FlagES({ size = 22 }: FlagProps) {
  return frame(
    size,
    <>
      <rect width="24" height="6" fill="#c60b1e" />
      <rect y="6" width="24" height="12" fill="#ffc400" />
      <rect y="18" width="24" height="6" fill="#c60b1e" />
    </>,
    "flag-es"
  );
}

/** United Kingdom: the Union Jack, cropped to a circle. */
export function FlagGB({ size = 22 }: FlagProps) {
  return frame(
    size,
    <>
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0L24 24M24 0L0 24" stroke="#ffffff" strokeWidth="4.8" />
      <path d="M0 0L24 24M24 0L0 24" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M12 0V24M0 12H24" stroke="#ffffff" strokeWidth="8" />
      <path d="M12 0V24M0 12H24" stroke="#c8102e" strokeWidth="4.8" />
    </>,
    "flag-gb"
  );
}
