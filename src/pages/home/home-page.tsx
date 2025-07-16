import { About } from '@/components/common/about';
import { Contact } from '@/components/common/contact';
import { Hero } from '@/components/common/hero';
import { StepsToOrder } from '@/components/common/steps-to-order';

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
