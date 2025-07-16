import { Outlet } from 'react-router-dom';

import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';

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
