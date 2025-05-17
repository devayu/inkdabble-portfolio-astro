import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

import { useGSAP } from "@gsap/react";
import { cn } from "@utils/utils";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin);

const UnderlineLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;
      const onMouseEnter = contextSafe(() => {
        gsap.fromTo(
          underlineRef.current,
          {
            width: "0%",
            left: 0,
          },
          {
            width: "100%",
            duration: 0.3,
            ease: "power2.out",
          },
        );
      });

      const onMouseLeave = contextSafe(() => {
        gsap.to(underlineRef.current, {
          width: "0%",
          duration: 0.3,
          ease: "power2.in",
        });
      });

      const onLoaderComplete = contextSafe(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          underlineRef.current,
          {
            width: "0%",
            left: 0,
            right: "auto",
          },
          {
            width: "100%",
            duration: 0.3,
            ease: "power2.out",
          },
        ).to(underlineRef.current, {
          width: "0%",
          left: "auto",
          right: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });

      linkRef.current?.addEventListener("mouseenter", onMouseEnter);
      linkRef.current?.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("loaderComplete", onLoaderComplete);

      return () => {
        linkRef.current?.removeEventListener("mouseenter", onMouseEnter);
        linkRef.current?.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("loaderComplete", onLoaderComplete);
      };
    },
    { scope: linkRef },
  );

  return (
    <a href={href} ref={linkRef} className={cn("relative", className)}>
      {children}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#1be9c2]"
      />
    </a>
  );
};

export default UnderlineLink;
