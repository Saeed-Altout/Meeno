import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/navbar';
import { Footer } from '@/components/common/footer';

export default function HomeLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
