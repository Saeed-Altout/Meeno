import { Hero } from '@/components/sections/hero';
import { StepsToOrder } from '@/components/sections/steps-to-order';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <About />
      <StepsToOrder />
      <Contact />
    </div>
  );
};

HomePage.displayName = 'HomePage';

export default HomePage;
