// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // image: {
  //   service: passthroughImageService(),
  // },
  integrations: [react(), tailwind({ applyBaseStyles: false })],

  adapter: vercel(),
});