import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import type { IOptimizedImages } from "src/types/types";
import React from "react";
import { gsap } from "gsap";
import { cn } from "@utils/utils";
import { StaggerText } from "@components/StaggerText";
gsap.registerPlugin(useGSAP);

export const Category = ({ images = [] }: { images: IOptimizedImages[] }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    (context, createContext) => {
      if (!context) return;
      const videos = context.selector?.("video");
      const h1 = context.selector?.("h1");
      const divider = context.selector?.(".cross-divider");

      // Check if device is mobile (max-width: 768px)
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      videos.forEach((video: any, index: number) => {
        video.playbackRate = 1;
        const parent = video.closest("a[data-wrapper-index]");
        if (!parent) return;
        gsap.set(video, { opacity: 0 });

        parent.addEventListener("mouseenter", () => {
          gsap.to(video, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(h1[index], {
            color: "white",
            textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(divider, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        parent.addEventListener("mouseleave", () => {
          gsap.to(video, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          });
          gsap.to(h1[index], {
            color: "black",
            textShadow: "0 0 0px rgba(255, 255, 255, 0)",
            duration: 0.3,
            ease: "power2.in",
          });
          gsap.to(divider, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.in",
          });
        });
      });

      // Add resize listener to handle orientation changes
      window.addEventListener("resize", () => {
        const isMobileNow = window.matchMedia("(max-width: 768px)").matches;
        videos.forEach((video: any, index: number) => {
          if (isMobileNow) {
            gsap.set(video, { opacity: 1 });
            gsap.set(h1[index], {
              color: "white",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
            });
          } else {
            gsap.set(video, { opacity: 0 });
            gsap.set(h1[index], {
              color: "black",
              textShadow: "none",
            });
          }
        });
      });
    },
    { scope: container },
  );
  return (
    <div className="flex h-screen flex-col md:flex-row" ref={container}>
      {images.map((image, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className="relative flex h-full flex-col items-center justify-center md:w-1/2"
              key={index}
              data-wrapper-index={index}
            >
              <StaggerText>
                <a
                  href={image.url}
                  className={cn(
                    "absolute z-20 cursor-pointer text-4xl font-extrabold text-black underline",
                    image.class,
                  )}
                >
                  {image.name}
                </a>
              </StaggerText>
              {/* <video
                autoPlay
                muted
                loop
                className="absolute h-full w-full object-cover"
              >
                <source src={image.videoPath} type="video/mp4" />
              </video> */}
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
