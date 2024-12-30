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
      className="overflow-hidden"
    >
      <div className="mx-auto mt-0 max-w-[84rem] px-4">
        <NavBody navlinks={NAV_LINKS} currentUrl={currentUrl}></NavBody>
        <HeaderFooter />
      </div>
    </motion.div>
  );
};

export default Nav;
