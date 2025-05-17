import { gsap } from "gsap";

import ScrambleText from "@components/ScrambleTextWrapper";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";
gsap.registerPlugin(useGSAP);

export const GraphicFooter = () => {
  const workRef = useRef<HTMLAnchorElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const plusRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_: any, contextSafe) => {
      if (!contextSafe) return;

      const spinnerAnimation = () => {
        gsap.fromTo(
          plusRef.current,
          {
            rotation: 0,
          },
          {
            rotation: 360,
            duration: 0.75,
            ease: "power2.inOut",
            onComplete: () => {
              // After initial spin, start the mouse tracking
              const handleMouseMove = (e: MouseEvent) => {
                const container = containerRef.current;
                if (!container || !plusRef.current) return;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const plusRect = plusRef.current!.getBoundingClientRect();
                const plusCenterX =
                  plusRect.left + plusRect.width / 2 - rect.left;
                const plusCenterY =
                  plusRect.top + plusRect.height / 2 - rect.top;

                const angle =
                  Math.atan2(y - plusCenterY, x - plusCenterX) *
                  (180 / Math.PI);

                gsap.to(plusRef.current, {
                  rotation: angle,
                  duration: 0.3,
                  ease: "power2.out",
                  transformOrigin: "center center",
                });
              };

              containerRef.current?.addEventListener(
                "mousemove",
                handleMouseMove,
              );
            },
          },
        );
      };

      const onMouseEnter = contextSafe(() => {
        gsap.killTweensOf(svgRef.current);
        gsap.to(svgRef.current, {
          x: "+=10",
          duration: 0.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const onMouseLeave = contextSafe(() => {
        gsap.killTweensOf(svgRef.current);
        gsap.to(svgRef.current, {
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      });

      workRef.current?.addEventListener("mouseenter", onMouseEnter);
      workRef.current?.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("loaderComplete", spinnerAnimation);

      return () => {
        workRef.current?.removeEventListener("mouseenter", onMouseEnter);
        workRef.current?.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("loaderComplete", spinnerAnimation);
      };
    },
    { scope: workRef },
  );

  return (
    <div className="flex h-full flex-col md:flex-row" ref={containerRef}>
      <div className="flex items-center gap-4 border-[1px] border-l-0 border-[#1A2A25] p-8 text-6xl font-extrabold md:w-[67vw]">
        <p>Graphic Designer</p>
        <div className="icon-plus w-embed hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={80}
            height={80}
            viewBox="0 0 97 97"
            ref={plusRef}
          >
            <path
              fill="#1be9c2"
              d="M3.09944e-06 49.1736L37.7671 49.1736C40.4167 49.2185 42.8866 50.3412 44.6829 52.2722L44.7278 52.3171C46.6588 54.1134 47.7815 56.6282 47.8264 59.2329L47.8264 97H49.1736L49.1736 59.2329C49.2185 56.5833 50.3412 54.1134 52.2722 52.3171L52.3171 52.2722C54.1134 50.3412 56.6283 49.2185 59.2329 49.1736L97 49.1736V47.8264L59.2329 47.8264C56.5833 47.7815 54.1134 46.6588 52.3171 44.7278L52.2722 44.6829C50.3412 42.8866 49.2185 40.3718 49.1736 37.7671L49.1736 3.09944e-06H47.8264L47.8264 37.7671C47.7815 40.4167 46.6588 42.8866 44.7278 44.6829L44.6829 44.7278C42.8866 46.6588 40.3718 47.7815 37.7671 47.8264L3.09944e-06 47.8264V49.1736ZM48.5 44.4583C50.7454 44.4583 52.5417 46.2546 52.5417 48.5C52.5417 50.7454 50.7454 52.5417 48.5 52.5417C46.2546 52.5417 44.4583 50.7454 44.4583 48.5C44.4583 46.2546 46.2546 44.4583 48.5 44.4583Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex w-full items-center p-8 md:hidden md:w-1/3 md:justify-center md:self-end">
        <div className="text-lg md:max-w-96">
          <p>Hello, and welcome to InkDabble.</p>
          <p>
            I’m
            <span className="mx-1 bg-[#1be9c2] px-1 text-black opacity-95">
              <ScrambleText>
                <span>Astha Maurya</span>
              </ScrambleText>
            </span>
            , a designer specializing in fashion and graphic design with one
            year of professional experience.
          </p>
        </div>
      </div>
      <a
        className="flex items-center justify-between border-[1px] border-l-0 border-[#1A2A25] p-8 uppercase md:w-[33vw] md:justify-center"
        href="/work"
        ref={workRef}
      >
        <ScrambleText>
          <p className="text-6xl font-bold">Work</p>
        </ScrambleText>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="33"
          viewBox="0 0 62 33"
          fill="none"
          ref={svgRef}
        >
          <path
            d="M61.0882 15.6372C48.9618 15.6372 40.1176 0.803745 40.0265 0.62174C39.7529 0.166727 39.2059 0.0757228 38.75 0.257728C38.2941 0.530736 38.2029 1.07675 38.3853 1.53177C38.6588 2.07778 44.4029 11.5421 53.2471 15.6372L0.911764 15.6372C0.364705 15.6372 -7.39744e-07 16.0012 -7.15877e-07 16.5472C-6.9201e-07 17.0932 0.364705 17.4572 0.911764 17.4572L53.2471 17.4572C44.4029 21.5523 38.6588 31.0166 38.3853 31.5626C38.2029 32.0176 38.2941 32.5637 38.75 32.8367C39.2059 33.0187 39.7529 32.9277 40.0265 32.4727C40.1176 32.2907 48.9618 17.4572 61.0882 17.4572C61.6353 17.4572 62 17.0932 62 16.5472C62 16.0012 61.6353 15.6372 61.0882 15.6372Z"
            fill="#F2F2F2"
          />
        </svg>
      </a>
    </div>
  );
};
