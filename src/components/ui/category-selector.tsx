import { AnimatePresence, motion } from "motion/react";
import graphicCategory from "../../assets/design-category.jpg";
import fashionCategory from "../../assets/fashion-category.jpg";
import { categoryImage } from "../../utils/animations";
import type { GetImageResult } from "astro";

type CategorySelectorProps = {
  images: {
    name: string;
    subtitle: string;
    path: string;
    optimizedImage?: any;
  }[];
};
interface IOptimizedImages {
  image: ImageMetadata;
  name: string;
  subtitle: string;
  path: string;
  optimizedImage?: GetImageResult;
}
const CategorySelector = ({ images = [] }: { images: IOptimizedImages[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-20 p-10"
    >
      <motion.div className="flex flex-col lg:justify-center gap-8">
        <motion.h1 className="hidden text-xl font-bold text-center px-4 lg:block text-balance">
          Click any image below to explore
        </motion.h1>
        <div className="flex items-center gap-8 lg:gap-4 p-4 lg:justify-evenly flex-col lg:flex-row">
          {images.map(({ name, subtitle, path, optimizedImage }) => {
            return (
              <a href={path} key={name}>
                <motion.div
                  className="relative cursor-pointer"
                  variants={categoryImage}
                  initial="initial"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={optimizedImage?.src}
                    alt={name}
                    width={700}
                    height={700}
                    className="h-full"
                  ></img>
                  <motion.div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    <span className="text-4xl font-bold text-white z-10 uppercase tracking-wider">
                      {subtitle}
                    </span>
                  </motion.div>
                </motion.div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};
export default CategorySelector;
