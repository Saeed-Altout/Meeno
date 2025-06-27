import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { useThemeStore } from '@/stores/theme-store';

export default function HomeLayout() {
  const { setTheme } = useThemeStore();
  const location = useLocation();
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

  // Reset activeSection when not on home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
    }
  }, [location.pathname]);

  // Track active section based on scroll position (only on home page)
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'steps', 'menu', 'about', 'contact'];
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
}
