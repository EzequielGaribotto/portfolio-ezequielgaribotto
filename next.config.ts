import type { NextConfig } from "next";
import nextI18NextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  ...nextI18NextConfig,
  experimental: {},
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    localeDetection: false, // Disable automatic locale detection
  },
};

export default nextConfig;