'use client';

import { useEffect } from 'react';

export function SiteAnimations() {
  useEffect(() => {
    const secciones = Array.from(document.querySelectorAll('main section')).filter(
      (s) => s.id !== 'reservar',
    );
    secciones.forEach((s) => s.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    secciones.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
