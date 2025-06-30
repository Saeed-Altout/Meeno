import { Hero } from '@/components/sections/hero';
import { StepsToOrder } from '@/components/sections/steps-to-order';
import { About } from '@/components/sections/about';
import { Menu } from '@/components/sections/menu';
import { OrderAgain } from '@/components/sections/order-again';
import { Contact } from '@/components/sections/contact';

const HomePage: React.FC = () => {
  const scrollToMenu = (): void => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero onScrollToMenu={scrollToMenu} />
      <StepsToOrder />
      <About />
      <Menu />
      <OrderAgain />
      <Contact />
    </div>
  );
};

HomePage.displayName = 'HomePage';

export default HomePage;
