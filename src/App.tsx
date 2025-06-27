import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import section components
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Favorites } from './components/sections/Favorites';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

// Import stores
import { useThemeStore } from './stores/theme-store';

function App() {
  const { setTheme } = useThemeStore();
  const [activeSection, setActiveSection] = useState('home');

  // Initialize theme on mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme-storage');
    if (isDarkMode) {
      try {
        const themeData = JSON.parse(isDarkMode);
        setTheme(themeData.state?.isDarkMode || false);
      } catch {
        console.warn('Failed to parse theme from localStorage');
      }
    }
  }, [setTheme]);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // Height of fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll to menu helper
  const scrollToMenu = () => scrollToSection('menu');

  // Track active section based on scroll position
  useEffect(() => {
    const sections = ['home', 'menu', 'favorites', 'about', 'contact'];
    const navbarHeight = 64;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + navbarHeight + 100;

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
    document.documentElement.style.scrollBehavior = 'smooth';
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

        {/* Favorites Section */}
        <Favorites />

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
        transition={{ delay: 0.5, duration: 0.5 }}
        className='fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center pointer-events-none'
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
        >
          🍝
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
