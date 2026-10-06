import React, { useEffect, useRef } from 'react';

/**
 * Animasi Nuansa Melayu:
 * 1. Guguran Kelopak Bunga Melur / Melati & Cempaka (Jasmine Petals)
 * 2. Kilauan Butiran Benang Emas Songket (Golden Songket Dust)
 * Sangat ringan, menggunakan canvas performa tinggi dan pointer-events-none.
 */
export const MalayAmbientAnimation: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool: Jasmine petals & golden songket motes
    interface Petal {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      angle: number;
      spinSpeed: number;
      type: 'petal' | 'gold_dust';
      opacity: number;
    }

    const particleCount = width < 768 ? 20 : 35;
    const particles: Petal[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 5 + 3,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.03,
        type: i % 3 === 0 ? 'gold_dust' : 'petal',
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.5 + p.speedX;
        p.angle += p.spinSpeed;

        // Reset particle to top when leaving bottom
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === 'petal') {
          // Jasmine blossom petal (putih gading berkilau emas)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius, p.radius * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254, 252, 240, ${p.opacity * 0.85})`;
          ctx.fill();

          // Golden center touch (sari bunga melati)
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.9})`;
          ctx.fill();
        } else {
          // Golden Songket Glimmer Diamond (Butiran Emas Songket)
          const size = p.radius * 0.6;
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.7, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.7, 0);
          ctx.closePath();
          ctx.fillStyle = `rgba(245, 225, 151, ${p.opacity * 0.8})`;
          ctx.shadowColor = '#d4af37';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.8 }}
      aria-hidden="true"
    />
  );
};
