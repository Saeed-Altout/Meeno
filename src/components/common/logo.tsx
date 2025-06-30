import logo from '@/assets/logo.png';

export const Logo = () => {
  return (
    <div className='w-fit h-[40px] overflow-hidden'>
      <img src={logo} alt='logo' className='w-full h-full object-contain' />
    </div>
  );
};
