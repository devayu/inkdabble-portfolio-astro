import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);
export const StaggerText = ({
  children,
  animateOnScroll = true,
  delay = 0,
}: {
  children: React.ReactElement | React.ReactElement[];
  animateOnScroll?: boolean;
  delay?: number;
}) => {
  const containerRef = useRef<any>(null);
  const elementRefs = useRef<any>([]);
  const splitRefs = useRef<any>(null);
  const linesRef = useRef<any>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      linesRef.current = [];

      let elements = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element: any, index: number) => {
        const split = new SplitText(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });
        splitRefs.current.push(split);
        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = textIndent;
          }
          element.style.textIndent = "0px";
        }
        linesRef.current.push(...split.lines);
      });

      gsap.set(linesRef.current, {
        y: "100%",
      });
      const animProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };
      if (animateOnScroll) {
        gsap.to(linesRef.current, {
          ...animProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(linesRef.current, animProps);
      }

      return () => {
        splitRefs.current.forEach((split: any) => {
          if (!split) return;
          split.revert();
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    },
  );
  if (React.Children.count(children) === 1) {
    return React.cloneElement(
      children as React.ReactElement,
      { ref: containerRef } as any,
    );
  }
  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};
