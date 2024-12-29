import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const about = defineCollection({
  loader: file("src/data/about.json", {
    parser: (text) => JSON.parse(text),
  }),
});

export const collections = { about };
