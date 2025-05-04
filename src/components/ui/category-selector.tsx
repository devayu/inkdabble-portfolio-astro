import { motion } from "motion/react";
import { categoryImageAV } from "../../utils/animations";
import type { IOptimizedImages } from "src/types/types";
import { cn } from "@utils/utils";
import type { PropsWithChildren } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

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
    <motion.div className="h-full w-full">
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

  return (
    <a href={path} className="">
      <motion.div
        className={`${cn("relative h-full w-full cursor-pointer", imageWrapperClassName)}`}
      >
        <img
          src={optimizedImage?.src}
          alt={alt}
          width={width}
          height={height}
          className={`${cn("absolute h-full w-full", className)}`}
        />
      </motion.div>
    </a>
  );
};

const ImageLinkContainer = ({ images }: { images: IOptimizedImages[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="relative">
          <ImageLink
            key={images[currentIndex].name}
            {...images[currentIndex]}
            imageWrapperClassName="min-h-[80vh]"
            className="object-cover object-center"
          />

          <button
            onClick={handlePrevious}
            className="absolute -bottom-2 left-1/4 z-20"
          >
            <ChevronLeft className="h-6 w-6 animate-pulse text-black" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -bottom-2 right-1/4 z-20"
          >
            <ChevronRight className="h-6 w-6 animate-pulse text-black" />
          </button>
        </div>
      </div>
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
