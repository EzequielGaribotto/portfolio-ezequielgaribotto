"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import EmailButton from "../../button/EmailButton";
import { useTranslation } from "../../../context/TranslationContext";
import ClickableButton from "../../button/ClickableButton";
import CVDownloadButton from "../../button/CVDownloadButton";
import { CONTACT } from "../../../constants";
import { scrollBehavior } from "../../../hooks/usePrefersReducedMotion";
import styles from "./ProfileSection.module.css";

export default function ProfileSection() {
  const { t } = useTranslation();
  const profileImage = "/images/profile/ezequiel-garibotto.webp";

  const handleImageError = () => {
    // Only log in development mode to reduce noise
    if (process.env.NODE_ENV === 'development') {
      console.warn("Profile image failed to load - this is normal if offline");
    }
  };

  // The one claim that can be checked: jump to the ProString entry under Experience
  const showProString = (e: React.MouseEvent) => {
    e.preventDefault();
    const entry = document.getElementById("prostring");
    if (!entry) return;
    const navbar = document.querySelector("header > div");
    const navbarBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;
    window.scrollTo({ top: entry.getBoundingClientRect().top + window.scrollY - navbarBottom - 16, behavior: scrollBehavior() });
  };
  const [proofBefore, proofAfter = ""] = t("aboutMe.proof").split(t("aboutMe.proofLink"));

  return (
    <div id="profile" className={styles.profileSection}>
      {/* Profile Image - Always on the left */}
      <div className={styles.profileImageContainer}>
        <Image
          src={profileImage}
          alt={t("aboutMe.photoAlt") || "Ezequiel Garibotto's profile picture"}
          className={styles.profileImage}
          width={275}
          height={275}
          priority
          sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
          onError={handleImageError}
        />
      </div>

      {/* Content - Vertically aligned center */}
      <div className={styles.contentContainer}>
        {/* Name */}
        <h1 className={styles.name}>{t("aboutMe.title")}</h1>

        {/* Description */}
        <p className={styles.description}>{t("aboutMe.description")}</p>

        {/* Proof */}
        <p className={styles.proof}>
          {proofBefore}
          <a href="#prostring" onClick={showProString}>{t("aboutMe.proofLink")}</a>
          {proofAfter}
        </p>

        {/* Buttons Section */}
        <div className={styles.buttonSection}>
          {/* Social Links */}
          <div className={styles.socialLinks}>
            <ClickableButton
              href="https://github.com/EzequielGaribotto"
              className={`${styles.socialButton} ${styles.githubButton}`}
              tooltipKey="tooltips.github"
            >
              <FaGithub className={styles.socialIcon} />
            </ClickableButton>
            
            <ClickableButton
              href="https://www.linkedin.com/in/ezequiel-garibotto/"
              className={`${styles.socialButton} ${styles.linkedinButton}`}
              tooltipKey="tooltips.linkedin"
            >
              <FaLinkedin className={styles.socialIcon} />
            </ClickableButton>
            
            <EmailButton
              email={CONTACT.EMAIL}
              className={`${styles.socialButton} ${styles.emailButton}`}
            />
          </div>

          {/* CV Download Button */}
          <div className={styles.cvButtonContainer}>
            <CVDownloadButton variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
