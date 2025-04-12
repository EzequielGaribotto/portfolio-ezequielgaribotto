"use client";

import { useTranslation } from "../context/TranslationContext";
import ClickableButton from "./ClickableButton";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-secondary text-foreground py-4 px-6 flex justify-between items-center transition">
      <span>{t("footer.disclaimer")}</span>
      <ClickableButton
        href="https://github.com/EzequielGaribotto/portfolio-ezequielgaribotto"
        className="text-primary hover:text-primary-hover"
      >
        {t("footer.githubLink")}
      </ClickableButton>
    </footer>
  );
}
