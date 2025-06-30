import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { StepsToOrder } from '@/components/sections/steps-to-order';
import { Menu } from '@/components/sections/menu';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

import { useThemeStore } from '@/stores/theme-store';
import { UI_CONSTANTS } from '@/constants/ui';

type ActiveSection =
  | 'home'
  | 'steps'
  | 'menu'
  | 'favorites'
  | 'about'
  | 'contact';

const App: React.FC = () => {
  const { setTheme } = useThemeStore();
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

  // Scroll to menu helper
  const scrollToMenu = (): void => scrollToSection('menu');

  // Track active section based on scroll position
  useEffect(() => {
    const sections: ActiveSection[] = [
      'home',
      'steps',
      'menu',
      'favorites',
      'about',
      'contact',
    ];

    const handleScroll = (): void => {
      const scrollPosition =
        window.scrollY +
        UI_CONSTANTS.NAVBAR_HEIGHT +
        UI_CONSTANTS.NAVBAR_SCROLL_OFFSET;

      for (const sectionId of sections) {
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
  }, []);

  // Handle smooth scroll behavior with CSS
  useEffect(() => {
    const enableSmoothScroll = (): void => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    enableSmoothScroll();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onScrollToMenu={scrollToMenu} />

        {/* Steps to Order Section */}
        <StepsToOrder />

        {/* Menu Section */}
        <Menu />

        {/* About Section */}
        <About />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onNavClick={scrollToSection} />

      {/* Global Loading Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: UI_CONSTANTS.LOADING_ANIMATION_DELAY / 1000,
          duration: UI_CONSTANTS.LOADING_ANIMATION_DURATION / 1000,
        }}
        className='fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center pointer-events-none'
        style={{ zIndex: UI_CONSTANTS.Z_INDEX.LOADING_OVERLAY }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className='text-amber-600 text-4xl'
          role='img'
          aria-label='Loading animation'
        >
          🍝
        </motion.div>
      </motion.div>
    </div>
  );
};

App.displayName = 'App';

export default App;
