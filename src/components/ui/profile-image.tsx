import profile from "@assets/profile.jpg";
import { motion } from "motion/react";

export const ProfileImage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-fit border-[20px] border-white">
        <img
          src={profile.src}
          height={200}
          className="h-full object-cover"
        ></img>
        <div className="absolute bottom-0 h-[40px] w-full bg-white">
          <p className="mt-2 text-center text-black">this is meeee!!!!!!</p>
        </div>
      </div>
      <p className="text-justify">
        Hello, I’m Astha Maurya, a designer specializing in fashion and graphic
        design with one year of professional experience. I am passionate about
        creating impactful designs that inspire and tell compelling stories. My
        work reflects a commitment to innovation, attention to detail, and a
        drive to push creative boundaries. This portfolio highlights my journey,
        showcasing my skills, vision, and the projects that define my approach
        to design. Thank you for taking the time to explore my work.
      </p>
    </div>
  );
};
