import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

export const CategorySvg = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef1 = useRef<SVGTextElement>(null);
  const textRef2 = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;

      // Create the main timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power2.inOut",
        },
      });

      // Initial state
      gsap.set("#mainLine", { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.set(["#leftBranch", "#rightBranch"], {
        strokeDasharray: 500,
        strokeDashoffset: 500,
      });
      gsap.set([textRef1.current, textRef2.current], { opacity: 0, y: 20 });

      // Animate main line from A to B
      tl.to("#mainLine", {
        strokeDashoffset: 0,
        duration: 2,
      })
        // Split into branches
        .to(
          ["#leftBranch", "#rightBranch"],
          {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.2,
          },
          ">",
        )
        // Reveal texts
        .to(
          [textRef1.current, textRef2.current],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        );
    },
    { scope: svgRef },
  );

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0"
      >
        {/* Main vertical line from A to B */}
        <path
          id="mainLine"
          d="M500 950 L500 500"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Left branch from B to C with more pronounced curve */}
        <path
          id="leftBranch"
          d="M500 500 C 500 500, 300 500, 200 300"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Right branch from B to D with more pronounced curve */}
        <path
          id="rightBranch"
          d="M500 500 C 500 500, 700 500, 800 300"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />

        {/* Text elements */}
        <text
          ref={textRef1}
          x="200"
          y="280"
          className="text-4xl font-bold"
          textAnchor="middle"
        >
          Graphic
        </text>

        <text
          ref={textRef2}
          x="800"
          y="280"
          className="text-4xl font-bold"
          textAnchor="middle"
        >
          Fashion
        </text>
      </svg>
    </div>
  );
};
