import { FaBehance, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { translate } from "../../utils/animations";
import { motion } from "motion/react";
import type { ComponentProps, PropsWithChildren } from "react";
import type React from "react";

const IconMapping: Record<string, React.ReactNode> = {
  behance: <FaBehance size={24} className="hover:fill-blue-700"></FaBehance>,
  linkedin: <FaLinkedinIn size={24}></FaLinkedinIn>,
  twitter: <FaXTwitter size={24}></FaXTwitter>,
  instagram: <FaInstagram size={24}></FaInstagram>,
};
const icon_mapping: Record<
  string,
  (props?: PropsWithChildren) => React.ReactNode
> = {
  behance: (props) => (
    <FaBehance size={24} {...props} className="hover:fill-blue-700"></FaBehance>
  ),
  linkedin: (props) => (
    <FaLinkedinIn
      size={24}
      {...props}
      className="hover:fill-[#0A66C2]"
    ></FaLinkedinIn>
  ),
  twitter: (props) => <FaXTwitter size={24} {...props}></FaXTwitter>,
  instagram: (props) => (
    <FaInstagram
      size={24}
      {...props}
      className="hover:fill-pink-700"
    ></FaInstagram>
  ),
};
const socialLinks = [
  {
    name: "LinkedIn",
    icon: icon_mapping["linkedin"],
    handle: "https://www.linkedin.com/in/astha-maurya24",
  },
  {
    name: "Instagram",
    icon: icon_mapping["instagram"],
    handle:
      "https://www.instagram.com/inkdabble/profilecard/?igsh=MTNraGZ5bDIxdXpjeA==",
  },
  {
    name: "X(Twitter)",
    icon: icon_mapping["twitter"],
    handle: "https://x.com/astha52409306?t=vAAbzz0GDkl91jSo7zt4jA&s=08",
  },
  {
    name: "Behance",
    icon: icon_mapping["behance"],
    handle: "https://www.behance.net/asthamaurya2",
  },
];
const HeaderFooter = () => {
  return (
    <div className="mt-10 flex flex-col justify-between text-sm uppercase lg:flex-row lg:items-center lg:gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
        <ul className="font-semibold lg:py-4">
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

        <ul className="py-4 font-normal opacity-50">
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

      <div className="flex items-end justify-end gap-4 py-4">
        {socialLinks.map(({ name, icon }) => {
          return (
            <div className="flex justify-center gap-2 overflow-hidden">
              {icon()}
              {/* <motion.p>{name}</motion.p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderFooter;
