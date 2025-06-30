import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';

import { useThemeStore } from '@/stores/theme-store';
import { UI_CONSTANTS } from '@/constants/ui';

type ActiveSection = 'home' | 'steps' | 'menu' | 'about' | 'contact' | '';

const HOME_SECTIONS: Array<Exclude<ActiveSection, ''>> = [
  'home',
  'steps',
  'menu',
  'about',
  'contact',
];

const HomeLayout: React.FC = () => {
  const { setTheme } = useThemeStore();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = (): void => {
      const storedTheme = localStorage.getItem('theme-storage');
      if (storedTheme) {
        try {
          const themeData = JSON.parse(storedTheme);
          setTheme(themeData.state?.isDarkMode || false);
        } catch (error) {
          console.warn('Failed to parse theme from localStorage:', error);
        }
      }
    };

    initializeTheme();
  }, [setTheme]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - UI_CONSTANTS.NAVBAR_HEIGHT;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Reset activeSection when not on home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
    }
  }, [location.pathname]);

  // Track active section based on scroll position (only on home page)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = (): void => {
      const scrollPosition =
        window.scrollY +
        UI_CONSTANTS.NAVBAR_HEIGHT +
        UI_CONSTANTS.NAVBAR_SCROLL_OFFSET;

      for (const sectionId of HOME_SECTIONS) {
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer onNavClick={scrollToSection} />
    </div>
  );
};

HomeLayout.displayName = 'HomeLayout';

export default HomeLayout;
