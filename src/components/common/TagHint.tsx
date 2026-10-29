"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { TAG_HINT_KEYS, PROJECT_TAG_HINTS, PROJECT_SCOPE_STATUS, ScopeStatus } from "../../constants/tagHints";
import { usedDescendants } from "../../constants/techTaxonomy";
import { placeTooltip } from "../../utils/tooltipPlacement";
import HintText from "./HintText";
import styles from "./TagHint.module.css";

interface TagHintProps {
  tag: string;
  /** Card the tag sits in: the hint then lists only what was done or planned there. */
  projectId?: string;
  /** Tags available to look up concrete technologies in: the card's tags, or all projects' tags. */
  pool?: string[];
  /** Called with the tag on hover/focus and null on leave, for tags that have concrete technologies. */
  onHoverChange?: (tag: string | null) => void;
  /** The tag sits in a column beside plain text: with no room above, the tip opens to its left, not over the tags below. */
  sideWhenCrowded?: boolean;
  /** The child is itself focusable (a button): the wrapper is no extra tab stop and the child carries the description. */
  childFocusable?: boolean;
  /** Touch: a tap does not open the tip (the page shows the hint inline instead). */
  noTouchTip?: boolean;
  /** Work not finished under this tag; defaults to what the project says about it. Shown on the chip itself. */
  status?: ScopeStatus;
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
export default function TagHint({
  tag,
  projectId,
  pool,
  onHoverChange,
  sideWhenCrowded,
  childFocusable,
  noTouchTip,
  status: statusProp,
  children,
}: TagHintProps) {
  const { t } = useTranslation();
  const hintKey = TAG_HINT_KEYS[tag];
  const status = statusProp ?? (projectId ? PROJECT_SCOPE_STATUS[projectId]?.[tag] : undefined);
  const hasChildren = usedDescendants(tag, pool).length > 0;
  const notify = hasChildren ? onHoverChange : undefined;
  const [open, setOpen] = useState(false);
  // Escape hides the tip while the pointer or focus is still on the tag; leaving the tag re-arms it.
  const [dismissed, setDismissed] = useState(false);
  const tipId = useId();
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

  if (!hintKey && !hasChildren && !status) return <>{children}</>;

  const place = () => {
    if (hintKey) placeTooltip(tipRef.current, { flipBelowTop: 90, sideWhenCrowded });
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
      className={`${hintKey ? styles.hint : styles.plain} ${open ? styles.open : ""} ${dismissed ? styles.dismissed : ""}`}
      data-status={status}
      tabIndex={hintKey && !childFocusable ? 0 : undefined}
      aria-describedby={hintKey && !childFocusable ? tipId : undefined}
      onKeyDown={(e) => {
        if (e.key !== "Escape" || !hintKey) return;
        setDismissed(true);
        setOpen(false);
      }}
      onClick={() => {
        if (!window.matchMedia("(hover: none)").matches) return;
        if (noTouchTip) return;
        const next = !open;
        place();
        setOpen(next);
        notify?.(next ? tag : null);
      }}
      onMouseEnter={() => {
        place();
        notify?.(tag);
      }}
      onMouseLeave={() => {
        setDismissed(false);
        notify?.(null);
      }}
      onFocus={(e) => {
        if (!(e.target as HTMLElement).matches(":focus-visible")) return;
        place();
        notify?.(tag);
      }}
      onBlur={() => {
        setDismissed(false);
        notify?.(null);
      }}
    >
      {childFocusable && hintKey && React.isValidElement<{ "aria-describedby"?: string }>(children)
        ? React.cloneElement(children, { "aria-describedby": tipId })
        : children}
      {status && <span className={styles.status}>{t(`scopeStatus.${status}`)}</span>}
      {hintKey && (
        <span ref={tipRef} id={tipId} role="tooltip" className={styles.tip}>
          <HintText text={text} labelClassName={styles.tipLabel} />
        </span>
      )}
    </span>
  );
}
