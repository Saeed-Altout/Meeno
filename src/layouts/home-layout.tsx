import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
