export const VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  quaternary: "quaternary",
  quinary: "quinary",
} as const;

export type Variant = (typeof VARIANTS)[keyof typeof VARIANTS];
