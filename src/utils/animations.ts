const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

export const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.35 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.35 },
  },
};

export const color = {
  initial: {
    backgroundColor: "black",
    color: "white",
    opacity: 1,
  },
  open: {
    backgroundColor: "white",
    transition,
    color: "black",
    opacity: 0.9,
  },
  closed: {
    backgroundColor: "black",
    transition,
    color: "white",
    opacity: 1,
  },
};

export const height = {
  initial: {
    height: 0,
  },
  enter: {
    height: "auto",
    transition,
  },
  exit: {
    height: 0,
    transition,
  },
};

export const translate = {
  initial: {
    y: "100%",
  },
  enter: (delay: number[]) => ({
    y: 0,
    opacity: 1,
    transition: { ...transition, delay: delay[0] },
  }),
  exit: (delay: number[]) => ({
    y: "100%",
    opacity: 0,
    transition: { ...transition, duration: 0.7, delay: delay[1] },
  }),
};

export const blur = {
  initial: {
    filter: "blur(10px)",
    opacity: 1,
  },
  enter: {
    filter: "blur(4px)",
    opacity: 0.6,
    transition: { duration: 0.3 },
  },
  exit: {
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export const background = {
  initial: {
    height: 0,
    backgroundColor: "black",
  },
  open: {
    height: "100vh",
    transition,
  },
  closed: {
    height: "0",
    transition,
  },
};

export const categoryImage = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  leaving: {
    scale: 0.5,
    transition,
    opacity: 0,
  },
  entering: {
    scale: 1,
    transition,
  },
};

export const categoryPage = {
  initial: {
    y: "100vh",
    scale: 0,
    opacity: 0,
  },
  entering: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { ...transition, duration: 1 },
  },
  leaving: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { ...transition, duration: 1 },
  },
};
