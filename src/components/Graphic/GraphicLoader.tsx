import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
export const GraphicLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const countRefs = useRef<HTMLDivElement[]>([]);
  const digitH1Refs = useRef<(HTMLHeadingElement | null)[][]>([]);
  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      tl.current = gsap.timeline({
        delay: 0.3,
        defaults: {
          duration: 1,
          ease: "hop",
        },
        onComplete: () => {
          const completeEvent = new CustomEvent("loaderComplete");
          document.dispatchEvent(completeEvent);
        },
      });
      countRefs.current.forEach((_, index) => {
        tl.current?.to(
          digitH1Refs.current[index],
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index * 1,
        );
        if (index < countRefs.current.length) {
          tl.current?.to(
            digitH1Refs.current[index],
            {
              y: "-140%",
              duration: 1,
              stagger: 0.075,
            },
            index * 1 + 1,
          );
        }
      });
      tl.current?.to(
        ".word h1",
        {
          y: "0%",
          duration: 1,
        },
        "<",
      );
      tl.current?.to(".word-1 h1", {
        y: "100%",
        duration: 1,
        delay: 0.3,
      });
      tl.current?.to(
        ".word-2 h1",
        {
          y: "-100%",
          duration: 1,
        },
        "<",
      );
      tl.current?.to(".block", {
        clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        onComplete: () => {
          gsap.to(loaderRef.current, { zIndex: -1, duration: 0 });
          gsap.to(".counter", { zIndex: -1, duration: 0 });
        },
      });
    },
    { scope: loaderRef },
  );
  return (
    <div
      className="loader fixed left-0 top-0 z-10 h-screen w-screen overflow-hidden"
      ref={loaderRef}
    >
      <div className="overlay absolute top-0 flex h-full w-full">
        <div className="block h-full w-full bg-[#020e0a]"></div>
        <div className="block h-full w-full bg-[#020e0a]"></div>
      </div>
      <div className="logo absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
        <div className="word word-1 relative">
          <h1>
            <span className="italic-font text-4xl font-bold">ink</span>
          </h1>
        </div>
        <div className="word word-2">
          <h1>
            <span className="text-4xl font-bold">dabble</span>
          </h1>
        </div>
      </div>
      <div className="counter absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {[
          [0, 0],
          [3, 0],
          [6, 7],
          [9, 0],
        ].map((count, index) => {
          if (!digitH1Refs.current[index]) {
            digitH1Refs.current[index] = [];
          }
          return (
            <div
              className="count absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1"
              key={JSON.stringify(count)}
              ref={(el) => {
                if (!el) return;
                countRefs.current[index] = el;
              }}
            >
              <div className="digit flex-1 pt-4 text-7xl font-semibold">
                <h1
                  ref={(el) => {
                    if (!el) return;
                    digitH1Refs.current[index][0] = el;
                  }}
                >
                  {Number(count[0])}
                </h1>
              </div>
              <div className="digit flex-1 pt-4 text-7xl font-semibold">
                <h1
                  ref={(el) => {
                    if (!el) return;
                    digitH1Refs.current[index][1] = el;
                  }}
                >
                  {Number(count[0])}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
