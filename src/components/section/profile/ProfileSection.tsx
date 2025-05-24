"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "../../../context/TranslationContext";
import ClickableButton from "../../button/ClickableButton";
import CVDownloadButton from "../../button/CVDownloadButton";
import styles from "./ProfileSection.module.css";

export default function ProfileSection() {
  const { t } = useTranslation();
  const profileImage = "/images/profile/ezequiel-garibotto.png";

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
          onError={() => {
            console.error("Failed to load profile image");
          }}
        />
      </div>

      {/* Content - Vertically aligned center */}
      <div className={styles.contentContainer}>
        {/* Name */}
        <h1 className={styles.name}>{t("aboutMe.title")}</h1>

        {/* Description */}
        <p className={styles.description}>{t("aboutMe.description")}</p>

        {/* Buttons Section */}
        <div className={styles.buttonSection}>
          {/* Social Links */}
          <div className={styles.socialLinks}>
            <ClickableButton
              href="https://github.com/EzequielGaribotto"
              className={`${styles.socialButton} ${styles.githubButton}`}
            >
              <FaGithub size={22} className={styles.socialIcon} />
            </ClickableButton>
            <ClickableButton
              href="https://linkedin.com/in/ezequiel-garibotto"
              className={`${styles.socialButton} ${styles.linkedinButton}`}
            >
              <FaLinkedin size={22} className={styles.socialIcon} />
            </ClickableButton>
            <ClickableButton
              href="mailto:ezequielgaribottovillanueva@gmail.com"
              className={`${styles.socialButton} ${styles.emailButton}`}
            >
              <MdEmail size={22} className={styles.socialIcon} />
            </ClickableButton>
          </div>

          {/* CV Download Button */}
          <div className={styles.cvButtonContainer}>
            <CVDownloadButton />
          </div>
        </div>
      </div>
    </div>
  );
}
