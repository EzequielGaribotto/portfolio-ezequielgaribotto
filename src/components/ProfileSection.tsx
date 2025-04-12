"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "../context/TranslationContext";

export default function ProfileSection() {
  const { t } = useTranslation();
  const profileImage = "/images/profile/ezequiel-garibotto.png";

  return (
    <section className="profile-section">
      {/* Profile Image */}
      <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden mb-6">
        <Image
          src={profileImage}
          alt={t("aboutMe.photoAlt")}
          className="object-cover"
          width={200}
          height={200}
          onError={() => {
            console.error("Failed to load profile image");
          }}
        />
      </div>

      {/* Name and Description */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">Ezequiel Garibotto</h1> {/* Text color set to black */}
        <p className="text-lg max-w-[60%] mx-auto text-black">{t("aboutMe.description")}</p> {/* Text color set to black */}

        {/* Social Links */}
        <div className="mt-6 flex space-x-4 justify-center">
          <a
            href="https://github.com/EzequielGaribotto"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
          >
            <FaGithub size={24} className="text-white"/>
          </a>
          <a
            href="https://linkedin.com/in/ezequiel-garibotto"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
          >
            <FaLinkedin size={24} className="text-white"/>
          </a>
        </div>
      </div>
    </section>
  );
}
