import profile from "@assets/profile.jpg";
import { motion } from "motion/react";

export const ProfileImage = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <motion.div className="relative flex h-auto w-3/5 border-[20px] border-white max-[480px]:w-auto">
        <img
          src={profile.src}
          height={500}
          width={500}
          className="h-auto w-auto object-cover"
        ></img>
        <div className="absolute bottom-0 h-[40px] w-full bg-white">
          <p className="mt-2 text-center text-black">this is meeee!!!!!!</p>
        </div>
      </motion.div>
      <div>
        <p className="text-2xl font-bold sm:text-3xl">
          Hey there, I'm
          <span className="mx-2 bg-white px-1 text-black opacity-95">
            Astha Maurya
          </span>
          , a designer specializing in fashion and graphic design with one year
          of professional experience.
        </p>
        <p className="mt-10 opacity-85">
          I have a passion for crafting designs that not only look good but also
          tell a story. Whether it’s a chic outfit or a bold graphic, I believe
          every creation has a narrative waiting to be uncovered.
        </p>
        <p className="mt-10 opacity-85">
          From doodling in my sketchbook to bringing ideas to life, I love
          drawing and creating. Every project is an opportunity to express my
          unique vision and style, whether it’s a chic outfit or a bold graphic
          design.
        </p>
        <p className="mt-10 opacity-85">
          I thrive on pushing creative boundaries and embracing new ideas.
          Attention to detail is my secret weapon, ensuring that each piece not
          only looks great but also connects with its audience.
        </p>
      </div>

      {/* <div>
        <p className="text-2xl font-bold sm:text-3xl">
          Hello, I’m
          <span className="mx-2 bg-white px-1 text-black opacity-95">
            Astha Maurya
          </span>
          , a designer specializing in fashion and graphic design with one year
          of professional experience.
        </p>
        <p className="mt-10">
          I am passionate about creating impactful designs that inspire and tell
          compelling stories. My work reflects a commitment to innovation,
          attention to detail, and a drive to push creative boundaries.
        </p>
        <p className="mt-10">
          I am passionate about creating impactful designs that inspire and tell
          compelling stories.
        </p>
        <p className="mt-10">
          I am passionate about creating impactful designs.
        </p>
      </div> */}
    </div>
  );
};
