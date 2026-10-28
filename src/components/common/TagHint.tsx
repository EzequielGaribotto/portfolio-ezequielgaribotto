"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { TAG_HINT_KEYS, PROJECT_TAG_HINTS } from "../../constants/tagHints";
import styles from "./TagHint.module.css";

interface TagHintProps {
  tag: string;
  /** Card the tag sits in: the hint then lists only what was done or planned there. */
  projectId?: string;
  children: React.ReactNode;
}

/** Wraps a tag; if it has a hint, shows it on hover, keyboard focus, or a tap on touch screens. */
export default function TagHint({ tag, projectId, children }: TagHintProps) {
  const { t } = useTranslation();
  const hintKey = TAG_HINT_KEYS[tag];
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

  if (!hintKey) return <>{children}</>;
  const scoped = !!projectId && !!PROJECT_TAG_HINTS[projectId]?.includes(hintKey);

  return (
    <span
      ref={rootRef}
      className={`${styles.hint} ${open ? styles.open : ""}`}
      tabIndex={0}
      onClick={() => {
        if (window.matchMedia("(hover: none)").matches) setOpen((o) => !o);
      }}
    >
      {children}
      <span role="tooltip" className={styles.tip}>
        {t(`tagHints.${hintKey}`)}
        {"\n\n"}
        {scoped ? t(`projectTagHints.${projectId}.${hintKey}`) : t(`tagExamples.${hintKey}`)}
      </span>
    </span>
  );
}
