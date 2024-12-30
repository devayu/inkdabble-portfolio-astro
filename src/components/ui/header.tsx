import { AnimatePresence, motion } from "motion/react";
import { color, opacity } from "../../utils/animations";
import { CiMail } from "react-icons/ci";
import Nav from "./header-nav";
import { cn } from "../../utils/utils";
import { EMAIL } from "../../constants";
import { useState } from "react";

const Header = ({ currentUrl }: { currentUrl: string }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <motion.header className="fixed top-0 z-50 box-border w-full p-4 uppercase">
      <motion.div
        variants={color}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="mx-auto flex max-w-[84rem] items-center justify-between p-2 backdrop-blur-md"
      >
        <a href="/" className="text-3xl font-bold">
          I.
        </a>
        <button
          className="flex cursor-pointer items-center justify-center gap-2 uppercase"
          onClick={() => setIsActive(!isActive)}
        >
          <div className="relative w-[22px]">
            <div
              className={`${cn(
                "absolute h-px w-full bg-[var(--bg-primary)] transition-all ease-[cubic-bezier(0.76,0,0.24,1)]",
                isActive ? "-rotate-45" : "top-[4px] bg-white",
              )}`}
            ></div>
            <div
              className={`${cn(
                "absolute h-px w-full bg-[var(--bg-primary)] transition-all ease-[cubic-bezier(0.76,0,0.24,1)]",
                isActive ? "rotate-45" : "top-[-4px] bg-white",
              )}`}
            ></div>
          </div>
          <div className="relative flex">
            <motion.p variants={opacity} animate={isActive ? "closed" : "open"}>
              menu
            </motion.p>
            <motion.p
              variants={opacity}
              animate={isActive ? "open" : "closed"}
              className="absolute opacity-0"
            >
              close
            </motion.p>
          </div>
        </button>
        <a href={`mailto:${EMAIL}`} aria-label={`Email- ${EMAIL}`}>
          <CiMail size={28} />
        </a>
      </motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav currentUrl={currentUrl}></Nav>}
      </AnimatePresence>
      {/* //TODO: Look into this later */}
      {/* <motion.div
        className="h-full w-full absolute opacity-50"
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
      ></motion.div> */}
    </motion.header>
  );
};

export default Header;
