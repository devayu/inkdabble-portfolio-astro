import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiCanva,
} from "react-icons/si";

interface ITool {
  icon?: React.ReactNode;
  name: string;
}

const icon_mapping: Record<string, React.ReactNode> = {
  photoshop: <SiAdobephotoshop size={28} />,
  illustrator: <SiAdobeillustrator size={28} />,
  indesign: <SiAdobeindesign size={28} />,
  canva: <SiCanva size={28} />,
  clo: (
    <span className="rounded-md bg-white p-[2px] font-semibold text-black">
      CLO
    </span>
  ),
  procreate: (
    <span className="rounded-md bg-white p-[2px] font-semibold text-black">
      procreate
    </span>
  ),
};

const ToolContainer = ({ icon, name }: ITool) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex cursor-pointer items-center justify-center"
    >
      {icon && icon}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 2,
              x: "-50%",
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md bg-neutral-100 px-2 py-0.5 text-sm text-neutral-900 opacity-20"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tools = ({ tools = [] }: { tools: { name: string; icon: string }[] }) => {
  return (
    <div className="flex gap-2">
      {tools.map(({ name, icon }) => {
        return (
          <ToolContainer name={name} key={name} icon={icon_mapping[icon]} />
        );
      })}
    </div>
  );
};

export default Tools;
