import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrambleText from "@components/ScrambleTextWrapper";
import { StaggerText } from "@components/StaggerText";
gsap.registerPlugin(useGSAP);

export const WorkCollectionGrid = ({
  collections,
}: {
  collections: { title: string; href: string }[];
}) => {
  const highlightRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    (_, contextSafe: any) => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const highlight = highlightRef.current;
      const gridContainer = gridContainerRef.current;
      if (!highlight) return;
      const gridItems = container.querySelectorAll(".grid-item");
      const firstItem = container.querySelector(".grid-item");

      const moveToElement = (element: HTMLElement) => {
        if (element && window.getComputedStyle(highlight).display !== "none") {
          gridItems.forEach((item) => {
            const target = item as HTMLElement;
            target.style.color = "white";
            target.dataset.active = "false";
          });

          const rect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          highlight.style.transform = `translate(${
            rect.left - containerRect.left
          }px, ${rect.top - containerRect.top}px)`;
          highlight.style.width = `${rect.width}px`;
          highlight.style.height = `${rect.height}px`;
          highlight.style.backgroundColor = "#1be9c2";
          element.style.color = "black";
          element.dataset.active = "true";
        }
      };

      const handleGridItemLeave = contextSafe((e: MouseEvent) => {
        const relatedTarget = e.relatedTarget as HTMLElement;

        // If moving to another grid item, let moveToElement handle it
        if (relatedTarget?.closest(".grid-item")) {
          return;
        }

        // If moving outside grid container, keep active items black
        if (!relatedTarget?.closest(".grid-row")) {
          gridItems.forEach((item) => {
            const gridItem = item as HTMLElement;
            if (gridItem.dataset.active === "true") {
              gridItem.style.color = "black";
            }
          });
        }
      });
      const moveHighlight = contextSafe((e: MouseEvent) => {
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);

        if (hoveredElement && hoveredElement.classList.contains("grid-item")) {
          moveToElement(hoveredElement as HTMLElement);
        } else if (
          hoveredElement &&
          hoveredElement.parentElement &&
          hoveredElement.parentElement.classList.contains("grid-item")
        ) {
          moveToElement(hoveredElement.parentElement);
        }
      });
      gridItems.forEach((item) => {
        item.addEventListener("mouseleave", handleGridItemLeave);
      });

      moveToElement(firstItem as HTMLElement);
      container.addEventListener("mousemove", moveHighlight);
      gridItems.forEach((item) => {
        item.addEventListener("mouseleave", handleGridItemLeave);
      });

      return () => {
        container.removeEventListener("mousemove", moveHighlight);
        gridItems.forEach((item) => {
          item.removeEventListener("mouseleave", handleGridItemLeave);
        });
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      className="relative my-auto flex h-screen w-full flex-col items-center md:justify-center md:gap-4"
      ref={containerRef}
    >
      <ScrambleText>
        <h1 className="p-4 text-center text-2xl font-extrabold uppercase md:text-7xl">
          Collections
        </h1>
      </ScrambleText>
      <div
        className="relative flex h-max w-[90%] grid-cols-5 flex-col border-[1px] border-r-0 border-[#1A2A25] md:h-[60%]"
        ref={gridContainerRef}
      >
        <div className="grid-row flex h-[90%] flex-1 flex-col items-center justify-center md:flex-row">
          {collections.slice(0, 4).map((collection, index) => {
            return (
              <a
                href={collection.href}
                key={index}
                className="grid-item flex h-full w-full flex-1 items-center justify-center border-b-[1px] border-r-[1px] border-[#1A2A25] p-16"
              >
                <StaggerText animateOnScroll={false}>
                  <p className="text-center text-2xl font-semibold">
                    {collection.title}
                  </p>
                </StaggerText>
              </a>
            );
          })}
        </div>
        <div className="grid-row flex h-[90%] flex-1 flex-col items-center justify-center md:flex-row">
          {collections.slice(4).map((collection, index) => {
            return (
              <a
                key={index}
                href={collection.href}
                className="grid-item flex h-full w-full flex-1 items-center justify-center border-b-[1px] border-r-[1px] border-[#1A2A25] p-16 md:border-b-0"
              >
                <StaggerText animateOnScroll={false}>
                  <p className="text-center text-2xl font-semibold">
                    {collection.title}
                  </p>
                </StaggerText>
              </a>
            );
          })}
        </div>
      </div>
      <div className="block p-4 md:hidden"></div>
      <div
        ref={highlightRef}
        className="highlight pointer-events-none absolute left-0 top-0 -z-10 hidden bg-[#1be9c2] transition-all md:block"
      ></div>
    </div>
  );
};
