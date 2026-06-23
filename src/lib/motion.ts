// Shared animation constants — ease-out-expo feel, premium and deliberate
export const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Single element: fade + rise
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

// Container that staggers children — standard spacing for cards/sections
export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// Tighter stagger for denser grids
export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};
