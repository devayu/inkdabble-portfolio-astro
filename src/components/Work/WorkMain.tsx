import ScrambleText from "@components/ScrambleTextWrapper";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@components/ui/badge";
import { StaggerText } from "@components/StaggerText";

gsap.registerPlugin(useGSAP);

type WorkMainProps = {
  image: string;
  projectName: string;
  projectDescription: string;
  previousProjectLink: string;
  nextProjectLink: string;
  projectMain: React.ReactElement;
  projectDedicatedLink?: string;
  type: string;
};
export const WorkMain = ({
  image,
  projectDedicatedLink,
  projectName,
  projectDescription,
}: WorkMainProps) => {
  const workRef = useRef<HTMLAnchorElement>(null);
  const nextRef = useRef<SVGSVGElement>(null);
  const prevRef = useRef<SVGSVGElement>(null);
  const prevARef = useRef<HTMLAnchorElement>(null);
  const nextARef = useRef<HTMLAnchorElement>(null);
  const plusRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    (context, contextSafe) => {
      if (!contextSafe) return;
      if (!context) return;
      const projectDedicatedLinkEl = context.selector?.(
        ".project-dedicated-link",
      );
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

      const onMouseEnterRight = contextSafe(() => {
        gsap.killTweensOf(nextRef.current);
        gsap.to(nextRef.current, {
          x: "+=10",
          duration: 0.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const onMouseEnterLeft = contextSafe(() => {
        gsap.killTweensOf(prevRef.current);
        gsap.to(prevRef.current, {
          x: "-=10",
          duration: 0.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
      const onMouseLeaveLeft = contextSafe(() => {
        gsap.killTweensOf(prevRef.current);
        gsap.to(prevRef.current, {
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      });
      const onMouseLeaveRight = contextSafe(() => {
        gsap.killTweensOf(nextRef.current);
        gsap.to(nextRef.current, {
          x: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      });
      const container = containerRef.current;
      const onFooterContainerMouseEnter = contextSafe(() => {
        gsap.to(projectDedicatedLinkEl!, {
          duration: 1,
          scrambleText: {
            text: "Show Project",
            speed: 4,
          },
          ease: "power2.inOut",
        });
      });
      const onFooterContainerMouseLeave = contextSafe(() => {
        gsap.to(projectDedicatedLinkEl!, {
          duration: 1,
          scrambleText: {
            text: projectName,
            speed: 4,
          },
        });
      });
      nextARef.current?.addEventListener("mouseenter", onMouseEnterRight);
      nextARef.current?.addEventListener("mouseleave", onMouseLeaveRight);
      prevARef.current?.addEventListener("mouseleave", onMouseLeaveLeft);
      prevARef.current?.addEventListener("mouseenter", onMouseEnterLeft);
      document.addEventListener("loaderComplete", spinnerAnimation);
      container?.addEventListener("mouseenter", onFooterContainerMouseEnter);
      container?.addEventListener("mouseleave", onFooterContainerMouseLeave);

      return () => {
        nextARef.current?.removeEventListener("mouseenter", onMouseEnterRight);
        prevARef.current?.removeEventListener("mouseenter", onMouseEnterLeft);
        nextARef.current?.removeEventListener("mouseleave", onMouseLeaveRight);
        prevARef.current?.removeEventListener("mouseleave", onMouseLeaveLeft);
        container?.removeEventListener(
          "mouseenter",
          onFooterContainerMouseEnter,
        );
        container?.removeEventListener(
          "mouseleave",
          onFooterContainerMouseLeave,
        );
        document.removeEventListener("loaderComplete", spinnerAnimation);
      };
    },
    { scope: containerRef },
  );
  return (
    <>
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full md:w-[67vw]">
          <img src={image} className="graphic-hero-img w-full"></img>
        </div>
        <div className="hidden w-full flex-col items-center p-8 md:flex md:w-1/3 md:justify-center md:self-end">
          <div className="self-start">
            <Badge>Hello</Badge>
          </div>
          <div className="text-lg md:max-w-96">
            <StaggerText animateOnScroll={false}>
              <p>{projectDescription}</p>
            </StaggerText>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col md:flex-row">
        {projectDedicatedLink ? (
          <a
            className="flex items-center gap-4 border-[1px] border-l-0 border-[#1A2A25] p-8 text-4xl font-extrabold md:w-[67vw] md:text-6xl"
            ref={containerRef}
            href={projectDedicatedLink}
          >
            <StaggerText animateOnScroll={false}>
              <p className="project-dedicated-link">{projectName}</p>
            </StaggerText>

            <div className="icon-plus w-embed hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="33"
                viewBox="0 0 62 33"
                fill="none"
              >
                <path
                  d="M61.0882 15.6372C48.9618 15.6372 40.1176 0.803745 40.0265 0.62174C39.7529 0.166727 39.2059 0.0757228 38.75 0.257728C38.2941 0.530736 38.2029 1.07675 38.3853 1.53177C38.6588 2.07778 44.4029 11.5421 53.2471 15.6372L0.911764 15.6372C0.364705 15.6372 -7.39744e-07 16.0012 -7.15877e-07 16.5472C-6.9201e-07 17.0932 0.364705 17.4572 0.911764 17.4572L53.2471 17.4572C44.4029 21.5523 38.6588 31.0166 38.3853 31.5626C38.2029 32.0176 38.2941 32.5637 38.75 32.8367C39.2059 33.0187 39.7529 32.9277 40.0265 32.4727C40.1176 32.2907 48.9618 17.4572 61.0882 17.4572C61.6353 17.4572 62 17.0932 62 16.5472C62 16.0012 61.6353 15.6372 61.0882 15.6372Z"
                  fill="#1be9c2"
                />
              </svg>
            </div>
          </a>
        ) : (
          <div className="flex items-center gap-4 border-[1px] border-l-0 border-[#1A2A25] p-8 text-4xl font-extrabold md:w-[67vw] md:text-6xl">
            <StaggerText animateOnScroll={false}>
              <p>{projectName}</p>
            </StaggerText>

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
        )}

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
          className="flex items-center justify-between border-[1px] border-l-0 border-[#1A2A25] p-8 uppercase md:w-[16.5vw] md:justify-center"
          href="/graphic/work"
          ref={prevARef}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="62"
            height="33"
            viewBox="0 0 62 33"
            fill="none"
            ref={prevRef}
          >
            <path
              d="M0.911765 15.6372C13.0382 15.6372 21.8824 0.803745 21.9735 0.62174C22.2471 0.166727 22.7941 0.0757228 23.25 0.257728C23.7059 0.530736 23.7971 1.07675 23.6147 1.53177C23.3412 2.07778 17.5971 11.5421 8.75294 15.6372L61.0882 15.6372C61.6353 15.6372 62 16.0012 62 16.5472C62 17.0932 61.6353 17.4572 61.0882 17.4572L8.75294 17.4572C17.5971 21.5523 23.3412 31.0166 23.6147 31.5626C23.7971 32.0176 23.7059 32.5637 23.25 32.8367C22.7941 33.0187 22.2471 32.9277 21.9735 32.4727C21.8824 32.2907 13.0382 17.4572 0.911765 17.4572C0.364706 17.4572 0 17.0932 0 16.5472C0 16.0012 0.364706 15.6372 0.911765 15.6372Z"
              fill="#F2F2F2"
            />
          </svg>
        </a>
        <a
          className="flex items-center justify-between border-[1px] border-l-0 border-[#1A2A25] p-8 uppercase md:w-[16.5vw] md:justify-center"
          href=""
          ref={nextARef}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="62"
            height="33"
            viewBox="0 0 62 33"
            fill="none"
            ref={nextRef}
          >
            <path
              d="M61.0882 15.6372C48.9618 15.6372 40.1176 0.803745 40.0265 0.62174C39.7529 0.166727 39.2059 0.0757228 38.75 0.257728C38.2941 0.530736 38.2029 1.07675 38.3853 1.53177C38.6588 2.07778 44.4029 11.5421 53.2471 15.6372L0.911764 15.6372C0.364705 15.6372 -7.39744e-07 16.0012 -7.15877e-07 16.5472C-6.9201e-07 17.0932 0.364705 17.4572 0.911764 17.4572L53.2471 17.4572C44.4029 21.5523 38.6588 31.0166 38.3853 31.5626C38.2029 32.0176 38.2941 32.5637 38.75 32.8367C39.2059 33.0187 39.7529 32.9277 40.0265 32.4727C40.1176 32.2907 48.9618 17.4572 61.0882 17.4572C61.6353 17.4572 62 17.0932 62 16.5472C62 16.0012 61.6353 15.6372 61.0882 15.6372Z"
              fill="#F2F2F2"
            />
          </svg>
        </a>
      </div>
    </>
  );
};
