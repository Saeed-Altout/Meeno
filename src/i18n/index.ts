import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import translation resources
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

/**
 * Language configuration type definition
 *
 * @typedef {Object} LanguageConfig
 * @property {string} code - The language code (e.g., 'en', 'ar')
 * @property {string} name - The display name of the language
 * @property {'ltr'|'rtl'} dir - Text direction (left-to-right or right-to-left)
 * @property {string} flag - Flag emoji representing the language
 */
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    dir: 'ltr' as const,
    flag: '🇺🇸',
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl' as const,
    flag: '🇸🇦',
  },
} as const;

type Language = keyof typeof languages;

/**
 * Language store interface
 */
interface LanguageState {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

/**
 * Zustand store for language state management
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    set => ({
      currentLanguage: 'en',
      setLanguage: (lang: Language) => {
        i18n.changeLanguage(lang);
        setDocumentDirection(lang);
        set({ currentLanguage: lang });
      },
    }),
    {
      name: 'language-store',
    }
  )
);

/**
 * Gets the text direction for a specified language.
 *
 * @param {string} lang - The language code to get direction for
 * @returns {'ltr'|'rtl'} The text direction ('ltr' or 'rtl')
 */
export const getLanguageDirection = (lang: string) => {
  return languages[lang as keyof typeof languages]?.dir || 'ltr';
};

/**
 * Sets the document direction and language attributes based on the selected language.
 *
 * @param {string} lang - The language code to set document direction for
 */
export const setDocumentDirection = (lang: string) => {
  const direction = getLanguageDirection(lang);
  document.documentElement.dir = direction;
  document.documentElement.lang = lang;
};

/**
 * i18n configuration for multilingual support.
 *
 * This module initializes the i18next library with language detection
 * and React integration for internationalization support.
 *
 * @module i18n
 */

/**
 * Initialize i18next with language detection and React integration
 */
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },

    fallbackLng: 'en',

    debug: import.meta.env.DEV,

    /**
     * Language detection configuration
     */
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

// Initialize document direction and sync with language store
const initializeLanguage = () => {
  const storedLanguage = useLanguageStore.getState().currentLanguage;
  i18n.changeLanguage(storedLanguage);
  setDocumentDirection(storedLanguage);
};

// Initialize after i18n is ready
i18n.on('initialized', initializeLanguage);

export default i18n;
