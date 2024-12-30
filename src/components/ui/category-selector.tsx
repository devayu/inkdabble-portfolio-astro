import { motion } from "motion/react";
import { categoryImageAV } from "../../utils/animations";
import type { IOptimizedImages } from "src/types/types";
import { cn } from "@utils/utils";
import type { PropsWithChildren } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

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
  url?: IOptimizedImages["url"];
}

const CategorySelector = ({ images = [] }: { images: IOptimizedImages[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
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
  url,
  subtitle,
  imageWrapperClassName,
  className,
  width,
  height,
}: IImageLink) => {
  const cld = new Cloudinary({ cloud: { cloudName: "diyflwga5" } });
  const img = cld.image("design-category_mykw75").format("auto");
  console.log(img);

  return (
    <a href={path} className="w-full lg:w-[40%]">
      <motion.div
        className={`${cn("relative h-full w-full cursor-pointer", imageWrapperClassName)}`}
        variants={categoryImageAV}
        initial="initial"
        whileHover={{ scale: 0.9 }}
      >
        <img
          src={url}
          alt={alt}
          width={width}
          height={height}
          className={`${cn("absolute h-full w-full", className)}`}
        />
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
            key={image.name}
            {...image}
            imageWrapperClassName="min-h-[40vh] lg:min-h-[80vh]"
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
