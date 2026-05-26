import { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    document.documentElement.classList.add('lenis');
    document.documentElement.classList.add('lenis-smooth');

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('lenis');
      document.documentElement.classList.remove('lenis-smooth');
    };
  }, []);

  return <>{children}</>;
};
export default SmoothScrollProvider;
