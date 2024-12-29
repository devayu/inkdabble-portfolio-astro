import { motion } from "motion/react";
import { categoryImageAV } from "../../utils/animations";
import type { IOptimizedImages } from "src/types/types";
import { cn } from "@utils/utils";
import type { PropsWithChildren } from "react";

interface IImageLink {
  path: string;
  name: string;
  alt: IOptimizedImages["alt"];
  optimizedImage?: IOptimizedImages["optimizedImage"];
  subtitle?: string;
  className?: string;
  imageWrapperClassName?: string;
  width?: number;
  height?: number;
}
const CategorySelector = ({ images = [] }: { images: IOptimizedImages[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="mt-20 w-full"
    >
      <ImageLinkContainer images={images}></ImageLinkContainer>
    </motion.div>
  );
};

const ImageLink = ({
  path,
  name,
  alt,
  optimizedImage,
  subtitle,
  imageWrapperClassName,
  className,
  width,
  height,
}: IImageLink) => {
  return (
    <a href={path} key={name} className="w-[40%]">
      <motion.div
        className={`${cn("relative h-full w-full cursor-pointer", imageWrapperClassName)}`}
        variants={categoryImageAV}
        initial="initial"
        whileHover={{ scale: 0.9 }}
      >
        <img
          src={optimizedImage?.src}
          alt={alt}
          width={width}
          height={height}
          className={`${cn("absolute h-full w-full", className)}`}
        ></img>
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 h-full bg-black opacity-60"></div>
          <span className="z-10 text-4xl font-bold uppercase tracking-wider text-white">
            {subtitle}
          </span>
        </motion.div>
      </motion.div>
    </a>
  );
};

const ImageLinkContainer = ({ images }: { images: IOptimizedImages[] }) => {
  return (
    <div className="flex flex-col items-center gap-8 p-4 lg:flex-row lg:justify-evenly lg:gap-4">
      {images.map((image) => {
        return (
          <ImageLink
            {...image}
            imageWrapperClassName="min-h-[80vh]"
            className="object-cover"
          ></ImageLink>
        );
      })}
    </div>
  );
};

const CategorySelectorHeader = ({ children }: PropsWithChildren) => {
  return (
    <motion.h1 className="hidden text-balance px-4 text-center text-xl font-bold lg:block">
      {children}
    </motion.h1>
  );
};

export default CategorySelector;
