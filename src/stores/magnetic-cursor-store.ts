import { create } from 'zustand';

interface MagneticState {
  rect: DOMRect | null;
  setRect: (rect: DOMRect | null) => void;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

export const useMagneticStore = create<MagneticState>(set => ({
  rect: null,
  isVisible: false,
  setRect: rect => set({ rect }),
  setVisible: visible => set({ isVisible: visible }),
}));
