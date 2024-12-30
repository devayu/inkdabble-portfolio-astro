import type { GetImageResult } from "astro";

export interface IOptimizedImages {
  image: ImageMetadata;
  name: string;
  subtitle: string;
  path: string;
  alt: string;
  optimizedImage?: GetImageResult;
  url?: string;
}
