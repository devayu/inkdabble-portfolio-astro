import type React from "react";
import {
  FaXTwitter,
  FaBehance,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useState } from "react";
import {
  socialMediaCardContainerAV,
  socialMediaTextAV,
} from "@utils/animations";
import { cn } from "@utils/utils";
const icon_mapping: Record<string, React.ReactNode> = {
  behance: <FaBehance size={24}></FaBehance>,
  linkedin: <FaLinkedinIn size={24}></FaLinkedinIn>,
  twitter: <FaXTwitter size={24}></FaXTwitter>,
  instagram: <FaInstagram size={24}></FaInstagram>,
};
interface ISocialMediaLinks {
  icon?: string;
  name: string;
  handle: string;
}

const PopupToolTip = ({ children, className, translateX }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.6 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 10,
        },
      }}
      exit={{ opacity: 0, y: 20, scale: 0.6 }}
      style={{
        translateX: translateX,
        whiteSpace: "nowrap",
      }}
      className={cn(
        "absolute bottom-1/2 flex flex-col items-center gap-2",
        className,
      )}
    >
      <div className="relative h-fit w-fit border-0 outline-0">
        <div className="flex h-12 items-center rounded-[1600px] bg-[var(--color-white-alpha)] p-2 backdrop-blur-lg">
          <span className="relative flex w-full items-center p-2 text-sm">
            {children}
          </span>
        </div>
      </div>
      {/* <div className="h-[200px] w-[1px] bg-white/[0.2]"></div> */}
    </motion.div>
  );
};
const SocialMediaCard = ({
  socialMediaLink,
  index,
  hoverLinkState,
  containerClassName,
  textClassName,
}: {
  socialMediaLink: ISocialMediaLinks;
  isActive?: boolean;
  containerClassName?: string;
  textClassName?: string;
  index: number;
  hoverLinkState?: { isActive: boolean; index: number };
}) => {
  const { icon, name, handle } = socialMediaLink;
  const iconToRender = icon && icon_mapping[icon];
  const isCurrentCardHovered =
    hoverLinkState?.isActive && index === hoverLinkState?.index;
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const gif =
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzFjeDI1ZndoNTRqZDZuYmpuYmt5Z3lhcDBjbGc1cTE2Nm54OXdnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HPdujrYT6ECgasjTdr/giphy.gif";
  const gifClassName = `bg-[url(${gif})]`;
  return (
    <motion.div
      className={cn(
        "relative flex h-[200px] items-center justify-center border border-white/[0.2] transition-all ease-in",
        containerClassName,
        // "before:fixed before:inset-0 before:z-[-1] before:bg-[url(https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzFjeDI1ZndoNTRqZDZuYmpuYmt5Z3lhcDBjbGc1cTE2Nm54OXdnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HPdujrYT6ECgasjTdr/giphy.gif)] before:opacity-0",
        `before:fixed before:inset-0 before:z-[-1] before:${gifClassName} before:opacity-0`,
        `hover:bg-[url("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzFjeDI1ZndoNTRqZDZuYmpuYmt5Z3lhcDBjbGc1cTE2Nm54OXdnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/HPdujrYT6ECgasjTdr/giphy.gif")]`,
        // `hover:${gifClassName}`,
        "hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50 hover:after:content-['']",
      )}
      // variants={socialMediaCardContainerAV}
      // animate={isCurrentCardHovered ? "enter" : "exit"}
    >
      {/* <AnimatePresence mode="popLayout">
        {isCurrentCardHovered && (
          <PopupToolTip translateX={translateX}>{handle}</PopupToolTip>
        )}
      </AnimatePresence> */}

      {/* <div className="m-auto h-full w-full bg-black p-4 opacity-50"> */}
      <div className="flex items-end justify-center gap-2 overflow-hidden">
        {iconToRender}
        <motion.p
          className={cn("relative", textClassName)}
          // variants={socialMediaTextAV}
          // initial="initial"
          // animate={isActive ? "entering" : "leaving"}
        >
          {name}
        </motion.p>
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export const SocialMediaCardContainer = ({
  socialMediaLinks = [],
}: {
  socialMediaLinks: ISocialMediaLinks[];
}) => {
  const [hoverLink, setHoverLink] = useState({ isActive: false, index: 0 });
  return (
    <div className="grid h-full w-full grid-cols-2 gap-4">
      {socialMediaLinks.map((socialMediaLink, index) => (
        <a
          href={socialMediaLink.handle}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
          onMouseOver={() => setHoverLink({ isActive: true, index })}
          onMouseLeave={() => setHoverLink({ isActive: false, index })}
        >
          <SocialMediaCard
            socialMediaLink={socialMediaLink}
            key={socialMediaLink.handle}
            hoverLinkState={hoverLink}
            index={index}
          ></SocialMediaCard>
        </a>
      ))}
    </div>
  );
};
