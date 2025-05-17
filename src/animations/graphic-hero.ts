import { gsap } from "gsap";

const graphicHero = () => {
  const tl = gsap.timeline({ delay: 1.75 });
  const movements = [-100, 300, 150, -300, -90, 100, -200];

  gsap.set("h1", { y: 100 });
  gsap.set(".counter p", { y: 35 });

  tl.to("h1", {
    y: 0,
    duration: 1,
    ease: "power3.inOut",
    stagger: 0.1,
  });
  tl.to(
    ".counter p",
    {
      y: 0,
      duration: 0.5,
      ease: "power3.inOut",
    },
    "-=0.5",
  );
  tl.to(".counter p", {
    y: -35,
    duration: 0.5,
    ease: "power3.inOut",
    delay: 0.5,
  });
  tl.to(".counter p", {
    y: -70,
    duration: 0.5,
    ease: "power3.inOut",
    delay: 0.5,
  });
  tl.to(".counter p", {
    y: -105,
    duration: 0.5,
    ease: "power3.inOut",
    delay: 0.75,
  });
  tl.to("h1", {
    fontSize: "18vw",
    duration: 1,
    ease: "power3.inOut",
  });
  tl.to(
    ".header-item",
    {
      clipPath: "none",
      duration: 0.1,
    },
    "<",
  );
  tl.to(
    ".block",
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 0.5,
      stagger: {
        amount: 0.5,
        from: "random",
        ease: "power3.inOut",
      },
    },
    // "<"
  );
  movements.forEach((movement, index) => {
    tl.to(
      `.letter-${index}`,
      {
        y: movement,
        duration: 0.5,
        ease: "power3.inOut",
      },
      "<",
    );
  });
};

export default graphicHero;
