"use client";

import React from "react";
import { useTranslation } from "../../context/TranslationContext";
import { TAG_HINT_KEYS } from "../../constants/tagHints";
import styles from "./TagHint.module.css";

interface TagHintProps {
  tag: string;
  children: React.ReactNode;
}

/** Wraps a tag; if it has a hint, shows it on hover or keyboard focus. */
export default function TagHint({ tag, children }: TagHintProps) {
  const { t } = useTranslation();
  const hintKey = TAG_HINT_KEYS[tag];

  if (!hintKey) return <>{children}</>;

  return (
    <span className={styles.hint} tabIndex={0}>
      {children}
      <span role="tooltip" className={styles.tip}>
        {t(`tagHints.${hintKey}`)}
      </span>
    </span>
  );
}
