import { Cloudinary } from "@cloudinary/url-gen";
import { cn } from "@utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import type { IOptimizedImages } from "src/types/types";
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

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
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
  direction,
}: IImageLink & { direction: number }) => {
  const cld = new Cloudinary({ cloud: { cloudName: "diyflwga5" } });
  return (
    <a href={path} className="">
      <div
        className={`${cn("relative h-full w-full cursor-pointer overflow-hidden", imageWrapperClassName)}`}
      >
        <motion.img
          initial={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          src={optimizedImage?.src}
          alt={alt}
          width={width}
          height={height}
          className={`${cn("absolute h-full w-full", className, "categoryImage")}`}
        />
      </div>
    </a>
  );
};

const ImageLinkContainer = ({ images }: { images: IOptimizedImages[] }) => {
  // Initialize with stored index or default to 0
  const [currentIndex, setCurrentIndex] = useState(() => {
    const stored = localStorage.getItem("categoryIndex");
    return stored ? parseInt(stored) : 0;
  });
  const [direction, setDirection] = useState(0);

  // Update localStorage whenever currentIndex changes
  useEffect(() => {
    localStorage.setItem("categoryIndex", currentIndex.toString());
  }, [currentIndex]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="relative">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <ImageLink
              key={images[currentIndex].name}
              {...images[currentIndex]}
              direction={direction}
              imageWrapperClassName="min-h-[80vh]"
              className="object-cover object-center"
            />
          </AnimatePresence>

          <motion.button
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={handlePrevious}
            className="absolute -bottom-2 left-1/4 z-20"
          >
            <ChevronLeft className="h-6 w-6 text-black" />
          </motion.button>

          <motion.button
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={handleNext}
            className="absolute -bottom-2 right-1/4 z-20"
          >
            <ChevronRight className="h-6 w-6 text-black" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
