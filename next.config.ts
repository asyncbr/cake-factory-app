import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  i18n: {
    locales: ['pt-BR', 'en', 'es'],
    defaultLocale: 'pt-BR',
  },
};

export default nextConfig;
