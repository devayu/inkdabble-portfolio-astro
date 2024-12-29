import { motion, AnimatePresence } from "motion/react";
export const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div>
      <AnimatePresence>
        <motion.h1
          className="text-5xl"
          initial={{
            y: 20,
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: -20,
          }}
          transition={{ ease: "easeIn" }}
        >
          {text}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};
