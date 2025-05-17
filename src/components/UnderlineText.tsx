import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

import { useGSAP } from "@gsap/react";
import { cn } from "@utils/utils";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin);

const UnderlineText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const linkRef = useRef<HTMLDivElement>(null);
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

      linkRef.current?.addEventListener("mouseenter", onMouseEnter);
      linkRef.current?.addEventListener("mouseleave", onMouseLeave);

      return () => {
        linkRef.current?.removeEventListener("mouseenter", onMouseEnter);
        linkRef.current?.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { scope: linkRef },
  );

  return (
    <div ref={linkRef} className={cn("relative", className)}>
      {children}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[1px] w-0 bg-current"
      />
    </div>
  );
};

export default UnderlineText;
