import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import type { IOptimizedImages } from "src/types/types";
import React from "react";
import { gsap } from "gsap";
import { cn } from "@utils/utils";
import { StaggerText } from "@components/StaggerText";
gsap.registerPlugin(useGSAP);

export const Category2 = ({ images = [] }: { images: IOptimizedImages[] }) => {
  const container = useRef<HTMLDivElement>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
    index: number,
  ) => {
    e.preventDefault();
    const wrapper = e.currentTarget.closest("[data-wrapper-index]");
    const otherWrapper = container.current?.querySelector(
      `[data-wrapper-index="${1 - index}"]`,
    );
    const crossDivider = container.current?.querySelector(".cross-divider");

    if (wrapper && otherWrapper && crossDivider && container.current) {
      // Create and append the fill overlay to the container instead of the wrapper
      const overlay = document.createElement("div");
      overlay.className = "fixed inset-0 z-40";
      overlay.style.backgroundColor = index === 0 ? "#020e0a" : "#000";
      overlay.style.transformOrigin =
        index === 0 ? "left center" : "right center";
      overlay.style.transform = "scaleX(0)";
      container.current.appendChild(overlay);

      const timeline = gsap.timeline();

      // Expand the overlay to full screen
      timeline.to(overlay, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Push other content out
      timeline.to(
        [otherWrapper, crossDivider],
        {
          x: index === 0 ? "100%" : "-100%",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<",
      );

      // Navigate after animation completes
      timeline.add(() => {
        window.location.href = url;
      });
    }
  };

  return (
    <div
      className="relative flex h-screen flex-col overflow-hidden md:flex-row"
      ref={container}
    >
      {images.map((image, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className="relative flex h-full flex-col items-center justify-center md:w-1/2"
              data-wrapper-index={index}
            >
              <StaggerText>
                <a
                  href={image.url}
                  className={cn(
                    "absolute z-20 cursor-pointer text-4xl font-extrabold text-black underline",
                    image.class,
                  )}
                  onClick={(e) => handleClick(e, image.url ?? "", index)}
                >
                  {image.name}
                </a>
              </StaggerText>
            </div>
            {index === 0 && (
              <div className="cross-divider absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black">
                ×
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
