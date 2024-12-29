import { translate } from "../../utils/animations";
import { motion } from "motion/react";

const HeaderFooter = () => {
  return (
    <div className="mt-10 flex items-center gap-4 text-sm uppercase">
      <ul className="py-4 font-semibold">
        <motion.li
          variants={translate}
          custom={[0.2, 0]}
          animate="enter"
          initial="initial"
          exit="exit"
        >
          <span className="font-normal opacity-50"> Made By: </span>{" "}
          <a href="/">devlusion</a>
        </motion.li>
      </ul>

      <ul className="py-4 font-semibold">
        <motion.li
          variants={translate}
          custom={[0.2, 0]}
          animate="enter"
          initial="initial"
          exit="exit"
        >
          {`Copyright © ${new Date().getFullYear()}, devlusion. All Rights Reserved.`}
        </motion.li>
      </ul>
    </div>
  );
};

export default HeaderFooter;
