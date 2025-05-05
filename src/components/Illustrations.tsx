import { cn } from "@utils/utils";
import { useState } from "react";
import type { IOptimizedImages } from "src/types/types";

export const Illustrations = ({ images }: { images: IOptimizedImages[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex w-full flex-col gap-8 p-4 md:p-8">
      <div className="flex justify-between md:w-[49%]">
        <a
          onClick={() => window.history.back()}
          className="cursor-pointer text-sm font-light uppercase tracking-wider text-[#4E526F] underline"
        >
          Back
        </a>
        <h1
          className={cn(
            "text-sm font-light uppercase tracking-wider text-[#4E526F]",
            "illustrationText",
          )}
        >
          Illustrations
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="md:w-1/2">
          <div className="flex h-full flex-col">
            <div className="aspect-[3/4] w-full">
              <img
                src={images[selectedImage].optimizedImage?.src}
                alt={images[selectedImage].alt}
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto md:w-1/2 md:overflow-x-scroll">
          <div className="grid min-w-max grid-flow-col gap-4 md:min-w-full md:grid-flow-row md:grid-cols-3 md:gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-[3/4] w-[200px] cursor-pointer md:w-auto",
                  selectedImage === index && "",
                )}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  draggable="false"
                  src={image.optimizedImage?.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                <div
                  className={cn(
                    "text-center leading-none transition-transform duration-300 ease-in-out",
                    selectedImage === index ? "text-black" : "text-transparent",
                  )}
                >
                  -
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
