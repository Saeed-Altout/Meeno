export const ANIMATIONS = {
  fadeIn: "fadeIn",
  fadeOut: "fadeOut",
  slideIn: "slideIn",
  slideOut: "slideOut",
  zoomIn: "zoomIn",
  zoomOut: "zoomOut",
} as const;

export type Animation = (typeof ANIMATIONS)[keyof typeof ANIMATIONS];

export const ANIMATION_DURATION = {
  fast: 100,
  medium: 300,
  slow: 500,
} as const;

export type AnimationDuration =
  (typeof ANIMATION_DURATION)[keyof typeof ANIMATION_DURATION];

export const SLIDE_DIRECTIONS = {
  left: "left",
  right: "right",
  up: "up",
  down: "down",
} as const;

export type SlideDirection =
  (typeof SLIDE_DIRECTIONS)[keyof typeof SLIDE_DIRECTIONS];
