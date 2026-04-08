'use client';
import { useEffect, useState } from 'react';

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the device supports touch (mobile)
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      className="fixed pointer-events-none z-[9999] w-64 h-64 rounded-full blur-[80px] transition-transform duration-100 ease-out"
      style={{
        left: position.x - 128,
        top: position.y - 128,
        background: 'radial-gradient(circle, rgba(34, 181, 97, 0.15) 0%, transparent 70%)',
      }}
    />
  );
}
