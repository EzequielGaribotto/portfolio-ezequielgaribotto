"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { TAG_HINT_KEYS, PROJECT_TAG_HINTS } from "../../constants/tagHints";
import { usedDescendants } from "../../constants/techTaxonomy";
import { placeTooltip } from "../../utils/tooltipPlacement";
import styles from "./TagHint.module.css";

interface TagHintProps {
  tag: string;
  /** Card the tag sits in: the hint then lists only what was done or planned there. */
  projectId?: string;
  /** Tags available to look up concrete technologies in: the card's tags, or all projects' tags. */
  pool?: string[];
  /** Called with the tag on hover/focus and null on leave, for tags that have concrete technologies. */
  onHoverChange?: (tag: string | null) => void;
  /** Always open the tooltip below the tag instead of above. */
  below?: boolean;
  /** Bold tooltip text. */
  boldTip?: boolean;
  children: React.ReactNode;
}

/**
 * Wraps a tag.
 * - Scope tags (Applied AI...) show a tooltip explaining their scope.
 * - Any bean with beans below it (children, grandchildren...) reports the hover (onHoverChange) so the
 *   card can highlight them. Generic technology tags (Python...) do only that; scope beans also show
 *   their tooltip.
 * Triggers: mouse hover, keyboard focus (focus-visible only), or a tap on touch screens.
 */
export default function TagHint({ tag, projectId, pool, onHoverChange, below, boldTip, children }: TagHintProps) {
  const { t } = useTranslation();
  const hintKey = TAG_HINT_KEYS[tag];
  const hasChildren = usedDescendants(tag, pool).length > 0;
  const notify = hasChildren ? onHoverChange : undefined;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  // Touch screens have no hover: a tap opens the hint (or highlight), a tap elsewhere closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        notify?.(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, notify]);

  if (!hintKey && !hasChildren) return <>{children}</>;

  const place = () => {
    if (!hintKey) return;
    placeTooltip(tipRef.current, { flipBelowTop: 90 });
    if (below && tipRef.current) tipRef.current.dataset.below = "1";
  };

  let text = "";
  if (hintKey) {
    const scoped = !!projectId && !!PROJECT_TAG_HINTS[projectId]?.includes(hintKey);
    text = `${t(`tagHints.${hintKey}`)}\n\n${
      scoped ? t(`projectTagHints.${projectId}.${hintKey}`) : t(`tagExamples.${hintKey}`)
    }`;
  }

  return (
    <span
      ref={rootRef}
      className={`${hintKey ? styles.hint : styles.plain} ${open ? styles.open : ""}`}
      tabIndex={0}
      onClick={() => {
        if (!window.matchMedia("(hover: none)").matches) return;
        const next = !open;
        place();
        setOpen(next);
        notify?.(next ? tag : null);
      }}
      onMouseEnter={() => {
        place();
        notify?.(tag);
      }}
      onMouseLeave={() => notify?.(null)}
      onFocus={(e) => {
        if (!e.currentTarget.matches(":focus-visible")) return;
        place();
        notify?.(tag);
      }}
      onBlur={() => notify?.(null)}
    >
      {children}
      {hintKey && (
        <span ref={tipRef} role="tooltip" className={`${styles.tip} ${boldTip ? styles.tipBold : ""}`}>
          {text}
        </span>
      )}
    </span>
  );
}
