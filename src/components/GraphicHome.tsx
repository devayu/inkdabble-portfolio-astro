import ScrambleText from "@components/ScrambleTextWrapper";
import { StaggerText } from "@components/StaggerText";

export const GraphicHome = () => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="w-full md:w-[67vw]">
        <img
          src="/src/assets/graphic-home.png"
          className="graphic-hero-img"
        ></img>
      </div>
      <div className="hidden w-full items-center p-8 md:flex md:w-1/3 md:justify-center md:self-end">
        <div className="text-lg md:max-w-96">
          <p>Hello, and welcome to InkDabble.</p>
          <p>
            I’m
            <span className="mx-1 bg-[#1be9c2] px-1 text-black opacity-95">
              <ScrambleText>
                <span>Astha Maurya</span>
              </ScrambleText>
            </span>
            , a designer specializing in fashion and graphic design with one
            year of professional experience.
          </p>
        </div>
      </div>
    </div>
  );
};
