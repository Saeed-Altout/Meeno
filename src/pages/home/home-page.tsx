import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Menu } from '@/components/sections/Menu';
import { OrderAgain } from '@/components/sections/OrderAgain';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero onScrollToMenu={scrollToMenu} />
      <About />
      <Menu />
      <OrderAgain />
      <Contact />
    </div>
  );
}
