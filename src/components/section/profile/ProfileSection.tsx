"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useTranslation } from "../../../context/TranslationContext";
import ClickableButton from "../../button/ClickableButton";
import CVDownloadButton from "../../button/CVDownloadButton";

export default function ProfileSection() {
  const { t } = useTranslation();
  const profileImage = "/images/profile/ezequiel-garibotto.png";

  return (
    <section className="flex flex-row items-center gap-8 py-12 px-4 justify-center">
      {/* Profile Image - Always on the left */}
      <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[275px] md:h-[275px] flex-shrink-0 rounded-full overflow-hidden border-4 border-primary/20 dark:border-primary-light/20 shadow-lg">
        <Image
          src={profileImage}
          alt={t("aboutMe.photoAlt") || "Ezequiel Garibotto's profile picture"}
          className="object-cover w-full h-full"
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
      <div className="flex flex-col items-center justify-center text-center py-4 max-w-lg">
        {/* Name - Explicitly set colors for each mode */}
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--mode-text, #000000)' }}>
          {t("aboutMe.title")}
        </h1>

        {/* Description - Centered with max-width */}
        <p 
          className="text-lg mb-6 text-center" 
          style={{ 
            color: 'var(--mode-desc, #4b5563)',
            maxWidth: 'min(100%, 30ch)' // This limits width to approximately the width of the name
          }}
        >
          {t("aboutMe.description")}
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Social Links */}
          <div className="flex space-x-4 justify-center">
            <ClickableButton
              href="https://github.com/EzequielGaribotto"
              className="w-12 h-12 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-full flex items-center justify-center shadow-md"
            >
              <FaGithub size={22} className="text-white" />
            </ClickableButton>
            <ClickableButton
              href="https://linkedin.com/in/ezequiel-garibotto"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md"
            >
              <FaLinkedin size={22} className="text-white" />
            </ClickableButton>
            <ClickableButton
              href="mailto:ezequielgaribottovillanueva@gmail.com"
              className="w-12 h-12 bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md"
            >
              <MdEmail size={22} className="text-white" />
            </ClickableButton>
          </div>

          {/* CV Download Button */}
          <div className="flex justify-center w-full">
            <CVDownloadButton className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
