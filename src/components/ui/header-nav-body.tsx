import { motion } from "motion/react";
import { translate } from "../../utils/animations";
import { useState } from "react";
import { blur } from "../../utils/animations";
import { cn } from "../../utils/utils";
import { ELEVATE } from "../../constants";

type NavBodyProps = {
  navlinks: {
    href: string;
    title: string;
  }[];
  currentUrl: string;
};
type HoverLinkType = {
  isActive: boolean;
  index: number;
};
const NavBody = ({ navlinks, currentUrl }: NavBodyProps) => {
  const [hoverLink, setHoverLink] = useState<HoverLinkType>({
    isActive: false,
    index: 0,
  });
  const getChars = (title: string, isActive: boolean) => {
    return title.split("").map((letter: string, index: number) => {
      return (
        <motion.span
          key={`c_${index}_${letter}`}
          custom={[index * 0.02, (title.length - index) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className={isActive && index === 0 ? "underline" : ""}
        >
          {letter}
        </motion.span>
      );
    });
  };
  return (
    <div className="mt-10 flex flex-wrap gap-8">
      {navlinks.map(({ href, title }, index) => {
        const isActive = currentUrl === href;

        return (
          <a
            onMouseOver={() => setHoverLink({ isActive: true, index })}
            onMouseLeave={() => setHoverLink({ isActive: false, index })}
            href={href}
            key={`lnk_${href}`}
            className={cn(
              "overflow-hidden text-3xl uppercase md:text-5xl",
              href.includes(ELEVATE)
                ? "bg-black px-2 text-white opacity-80"
                : "",
            )}
          >
            <motion.p
              variants={blur}
              className="flex"
              initial="initial"
              animate={
                hoverLink.isActive && hoverLink.index !== index
                  ? "enter"
                  : "exit"
              }
            >
              {getChars(title, isActive)}
            </motion.p>
          </a>
        );
      })}
    </div>
  );
};
export default NavBody;
