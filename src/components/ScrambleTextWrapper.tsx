import { useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/all";

// @ts-ignore
import { useGSAP } from "@gsap/react";
import React from "react";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin);

const ScrambleText = ({
  children,
  scrambleOnHover = false,
}: {
  children: React.ReactElement;
  scrambleOnHover?: boolean;
}) => {
  const containerRef = useRef<any>(null);

  useGSAP(
    (_: any, contextSafe: any) => {
      const scrambleAnimation = contextSafe(() => {
        gsap.to(containerRef.current, {
          duration: 1,
          scrambleText: {
            text:
              (children as React.ReactElement<any>).props.children ??
              "XYYWYXYW",
            speed: 2,
          },
        });
      });
      if (scrambleOnHover) {
        containerRef.current?.addEventListener("mouseenter", scrambleAnimation);
      } else {
        scrambleAnimation();
      }
      document.addEventListener("loaderComplete", scrambleAnimation);

      return () => {
        containerRef.current?.removeEventListener(
          "mouseenter",
          scrambleAnimation,
        );
        document.removeEventListener("loaderComplete", scrambleAnimation);
      };
    },
    { scope: containerRef },
  );

  if (React.isValidElement(children)) {
    return React.cloneElement(children, { ref: containerRef } as any);
  }
  return null;
};
export default ScrambleText;
