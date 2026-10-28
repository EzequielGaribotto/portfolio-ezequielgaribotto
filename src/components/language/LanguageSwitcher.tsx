"use client";

import React from "react";
import { useTranslation } from "../../context/TranslationContext";
import { FlagES, FlagGB } from "../icons/Flags";
import styles from "./LanguageSwitcher.module.css";

/** Two flags in a pill; a highlight slides to the language in use. Each flag is its own button. */
export default function LanguageSwitcher() {
  const { t, locale, changeLocale } = useTranslation();
  const english = locale === "en";

  return (
    <div className={styles.switch} role="group" aria-label={t("a11y.language")} data-locale={english ? "en" : "es"}>
      <span className={styles.thumb} aria-hidden="true" />
      <button
        type="button"
        lang="es"
        className={styles.option}
        aria-pressed={!english}
        aria-label="Español"
        onClick={() => changeLocale("es")}
      >
        <FlagES />
      </button>
      <button
        type="button"
        lang="en"
        className={styles.option}
        aria-pressed={english}
        aria-label="English"
        onClick={() => changeLocale("en")}
      >
        <FlagGB />
      </button>
    </div>
  );
}
