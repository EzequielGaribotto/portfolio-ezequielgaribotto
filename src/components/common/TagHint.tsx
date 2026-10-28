"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { TAG_HINT_KEYS, PROJECT_TAG_HINTS } from "../../constants/tagHints";
import { usedChildren } from "../../constants/techTaxonomy";
import styles from "./TagHint.module.css";

interface TagHintProps {
  tag: string;
  /** Card the tag sits in: the hint then lists only what was done or planned there. */
  projectId?: string;
  /** Tags available to look up concrete technologies in: the card's tags, or all projects' tags. */
  pool?: string[];
  /** Called with the tag on hover/focus and null on leave, for tags that have concrete technologies. */
  onHoverChange?: (tag: string | null) => void;
  children: React.ReactNode;
}

/**
 * Wraps a tag. Scope tags (Applied AI...) explain their scope; generic technology tags (Python,
 * Machine Learning...) list the concrete technologies used under them. Shown on hover, keyboard
 * focus, or a tap on touch screens.
 */
export default function TagHint({ tag, projectId, pool, onHoverChange, children }: TagHintProps) {
  const { t } = useTranslation();
  const hintKey = TAG_HINT_KEYS[tag];
  const concrete = hintKey ? [] : usedChildren(tag, pool);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  // Touch screens have no hover: a tap opens the hint, a tap elsewhere closes it.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  if (!hintKey && concrete.length === 0) return <>{children}</>;

  let text: string;
  if (hintKey) {
    const scoped = !!projectId && !!PROJECT_TAG_HINTS[projectId]?.includes(hintKey);
    text = `${t(`tagHints.${hintKey}`)}\n\n${
      scoped ? t(`projectTagHints.${projectId}.${hintKey}`) : t(`tagExamples.${hintKey}`)
    }`;
  } else {
    const header = !projectId
      ? t("techHints.acrossProjects")
      : projectId === "linkia"
        ? t("techHints.inProgram")
        : t("techHints.inProject");
    text = `${header}\n${concrete.join(", ")}`;
  }

  const notify = concrete.length > 0 && onHoverChange ? onHoverChange : undefined;

  return (
    <span
      ref={rootRef}
      className={`${styles.hint} ${open ? styles.open : ""}`}
      tabIndex={0}
      onClick={() => {
        if (window.matchMedia("(hover: none)").matches) setOpen((o) => !o);
      }}
      onMouseEnter={() => notify?.(tag)}
      onMouseLeave={() => notify?.(null)}
      onFocus={() => notify?.(tag)}
      onBlur={() => notify?.(null)}
    >
      {children}
      <span role="tooltip" className={styles.tip}>
        {text}
      </span>
    </span>
  );
}
