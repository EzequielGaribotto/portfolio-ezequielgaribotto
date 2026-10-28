"use client";

import React, { useState } from "react";
import { FaRegCopy, FaCheck, FaEnvelope, FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";
import Section from "../Section";
import CVDownloadButton from "../../button/CVDownloadButton";
import { useTranslation } from "../../../context/TranslationContext";
import { CONTACT } from "../../../constants";
import styles from "./ContactSection.module.css";

// mailto: only works when a mail app is registered, so the address opens a Gmail compose window instead
const GMAIL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.EMAIL)}`;
const OUTLOOK = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(CONTACT.EMAIL)}`;

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** The page's closing action: a short ledger of ways to reach me, with the CV in it. */
const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard
      .writeText(CONTACT.EMAIL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <Section id="contact" title={t("contact.title")}>
      <dl className={styles.ledger}>
        <div className={styles.row}>
          <dt className={styles.label}>
            <FaEnvelope className={styles.icon} aria-hidden="true" />
            {t("contact.email")}
          </dt>
          <dd className={styles.value}>
            <a href={GMAIL} target="_blank" rel="noopener noreferrer">
              {CONTACT.EMAIL}
            </a>
            <span className={styles.actions}>
              <a className={styles.action} href={OUTLOOK} target="_blank" rel="noopener noreferrer">
                Outlook
              </a>
              <button
                type="button"
                className={styles.action}
                onClick={copyEmail}
                aria-label={t("tooltips.email")}
                title={t("tooltips.email")}
              >
                {copied ? <FaCheck aria-hidden="true" /> : <FaRegCopy aria-hidden="true" />}
                {/* Floats above the button, so the row never changes height */}
                {copied && (
                  <span className={styles.copiedTip} aria-hidden="true">
                    {t("tooltips.emailCopied")}
                  </span>
                )}
              </button>
              <span className="sr-only" role="status">
                {copied ? t("tooltips.emailCopied") : ""}
              </span>
            </span>
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>
            <FaLinkedin className={styles.icon} aria-hidden="true" />
            LinkedIn
          </dt>
          <dd className={styles.value}>
            <a href={CONTACT.LINKEDIN} target="_blank" rel="noopener noreferrer">
              {strip(CONTACT.LINKEDIN)}
            </a>
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>
            <FaGithub className={styles.icon} aria-hidden="true" />
            GitHub
          </dt>
          <dd className={styles.value}>
            <a href={CONTACT.GITHUB} target="_blank" rel="noopener noreferrer">
              {strip(CONTACT.GITHUB)}
            </a>
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>
            <FaFileAlt className={styles.icon} aria-hidden="true" />
            CV
          </dt>
          <dd className={styles.value}>
            <CVDownloadButton variant="primary" compact className="inline-block" />
          </dd>
        </div>
      </dl>
    </Section>
  );
};

export default ContactSection;
