import HeaderFooter from "./header-footer";
import NavBody from "./header-nav-body";
import { NAV_LINKS } from "../../constants";
import { height } from "../../utils/animations";
import { motion } from "motion/react";

const Nav = ({ currentUrl }: { currentUrl: string }) => {
  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="mx-auto max-w-[84rem] overflow-hidden px-2"
    >
      <div className="m-0">
        <NavBody navlinks={NAV_LINKS} currentUrl={currentUrl}></NavBody>
        <HeaderFooter />
      </div>
    </motion.div>
  );
};

export default Nav;
