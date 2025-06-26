import { useRef, type ReactNode } from 'react';
import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { useMagneticStore } from '@/stores/magnetic-cursor-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const MagneticBackground = ({
  parentRef,
  className,
}: React.ComponentProps<typeof motion.div> & {
  parentRef: RefObject<HTMLElement | null>;
}) => {
  const { rect, isVisible } = useMagneticStore();

  if (!rect || !parentRef.current) return null;

  const parentRect = parentRef.current.getBoundingClientRect();
  const left = rect.left - parentRect.left;
  const top = rect.top - parentRect.top;

  return (
    <motion.div
      className={cn(
        'absolute z-0 bg-gray-100 rounded-md pointer-events-none',
        className
      )}
      initial={false}
      animate={{
        x: left,
        y: top,
        width: rect.width,
        height: rect.height,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    />
  );
};

export const MagneticCursor = ({
  children,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  children: ReactNode;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { setRect, setVisible } = useMagneticStore();

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setRect(rect);
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <Button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      variant='magnetic'
      size='sm'
      {...props}
    >
      {children}
    </Button>
  );
};
