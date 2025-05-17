import { useRef, useState } from "react";

import {
  IconBrandBehance,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";
import ScrambleText from "@components/ScrambleTextWrapper";
import UnderlineLink from "@components/UnderlineLink";
import { Wave } from "@components/Wave";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin);

export const GraphicHeader = () => {
  const handRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    (_: any, contextSafe) => {
      if (!contextSafe) return;
      const onMouseEnter = contextSafe(() => {
        gsap.to(handRef.current, {
          rotate: 20,
          transformOrigin: "70% 90%",
          duration: 0.2,
          yoyo: true,
          repeat: 5,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(handRef.current, { rotate: 0, duration: 0.2 });
          },
        });
      });

      if (isMenuOpen) {
        gsap.to(topBarRef.current, {
          rotate: 45,
          y: 3,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(bottomBarRef.current, {
          rotate: -45,
          y: -3,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        gsap.to([topBarRef.current, bottomBarRef.current], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
      const onClick = contextSafe(() => {
        gsap.to(buttonRef.current, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      });

      buttonRef.current?.addEventListener("click", onClick);

      containerRef.current?.addEventListener("mouseenter", onMouseEnter);
      return () => {
        buttonRef.current?.removeEventListener("click", onClick);
        containerRef.current?.removeEventListener("mouseenter", onMouseEnter);
      };
    },
    { scope: handRef, dependencies: [isMenuOpen] },
  );
  return (
    <div className="flex h-[8vh] min-w-full justify-between py-1">
      <div className="flex w-full items-center border-[1px] border-l-0 border-[#1A2A25] px-4 py-6">
        <a href="/" className="text-2xl font-extrabold">
          I <span className="text-[#1be9c2]">.</span>
        </a>
      </div>
      <div className="hidden w-full justify-between md:flex">
        <div className="w-[33vw] border-[1px] border-l-0 border-[#1A2A25] uppercase">
          <nav className="mx-auto flex flex-auto items-center justify-center gap-16 px-4 py-6">
            <UnderlineLink href="/about">
              <ScrambleText>
                <p>About</p>
              </ScrambleText>
            </UnderlineLink>

            <ScrambleText>
              <UnderlineLink href="/work">
                <p>Work</p>
              </UnderlineLink>
            </ScrambleText>
          </nav>
        </div>
        <div className="flex w-[16.5vw] items-center justify-center gap-6 border-[1px] border-x-0 border-[#1A2A25] px-4 py-6">
          <a href="">
            <IconBrandInstagram stroke={2} />
          </a>
          <a href="">
            <IconBrandLinkedin stroke={2} />
          </a>
          <a href="">
            <IconBrandBehance stroke={2} />
          </a>
        </div>
        <a
          href="/contact"
          className="flex w-[16.5vw] items-center justify-center gap-2 border-[1px] border-r-0 border-[#1A2A25] px-4 py-6"
          ref={containerRef}
        >
          <ScrambleText>
            <p className="uppercase">Say hello</p>
          </ScrambleText>
          <Wave ref={handRef}></Wave>
        </a>
      </div>
      <button
        ref={buttonRef}
        className="flex items-center gap-2 border-[1px] border-l-0 border-[#1A2A25] px-4 py-6 uppercase md:hidden"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <ScrambleText>
          <p>Menu</p>
        </ScrambleText>
        <div className="flex flex-col gap-1">
          <div
            ref={topBarRef}
            className="h-[2px] w-5 origin-center bg-current"
          />
          <div
            ref={bottomBarRef}
            className="h-[2px] w-5 origin-center bg-current"
          />
        </div>
      </button>
    </div>
  );
};
