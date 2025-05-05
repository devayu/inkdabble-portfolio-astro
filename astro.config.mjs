// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";

import lenis from "astro-lenis";

// https://astro.build/config
export default defineConfig({
  // image: {
  //   service: passthroughImageService(),
  // },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    icon(),
    lenis(),
  ],

  // adapter: vercel({
  //   imageService: true,
  // }),
  trailingSlash: "never",
});
