import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsStoreState {
  settings: string;
  setSettings: (settings: string) => void;
}

export const useSettingsStore = create<SettingsStoreState>()(
  persist(
    set => ({
      settings: '',
      setSettings: settings => set({ settings }),
    }),
    {
      name: 'settings-store',
      partialize: state => ({ settings: state.settings }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
