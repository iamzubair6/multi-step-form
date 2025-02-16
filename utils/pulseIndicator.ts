export const pulseAnimationVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: (delay = 0) => ({
    opacity: [0.25, 0],
    scale: delay ? 1.3 : 1.5,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeOut",
      delay,
      times: [0, 1],
    },
  }),
};
