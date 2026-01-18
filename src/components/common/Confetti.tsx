import { useEffect, useRef, useCallback } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  spread?: number;
  colors?: string[];
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  size: number;
  shape: 'square' | 'circle' | 'ribbon';
  opacity: number;
}

const defaultColors = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // mint
  '#f97316', // orange
  '#fbbf24', // yellow
  '#10b981', // green
];

export function Confetti({
  active,
  duration = 3000,
  particleCount = 100,
  spread = 70,
  colors = defaultColors,
  onComplete,
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return [];

    const particles: Particle[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.3;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.random() * spread * 2 - spread) * (Math.PI / 180) - Math.PI / 2;
      const velocity = 8 + Math.random() * 8;

      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity * (0.5 + Math.random()),
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        size: 6 + Math.random() * 6,
        shape: (['square', 'circle', 'ribbon'] as const)[Math.floor(Math.random() * 3)],
        opacity: 1,
      });
    }

    return particles;
  }, [particleCount, spread, colors]);

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update physics
        particle.vy += 0.3; // gravity
        particle.vx *= 0.99; // air resistance
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        particle.opacity = 1 - progress;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;

        if (particle.shape === 'square') {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ribbon
          ctx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
        }

        ctx.restore();
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }
    },
    [duration, onComplete]
  );

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles and start animation
    particlesRef.current = createParticles();
    startTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active, createParticles, animate]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}

export function useConfetti() {
  const triggerRef = useRef<(() => void) | null>(null);

  const ConfettiComponent = useCallback(
    ({ onComplete }: { onComplete?: () => void }) => {
      const [active, setActive] = useState(false);

      triggerRef.current = () => setActive(true);

      return (
        <Confetti
          active={active}
          onComplete={() => {
            setActive(false);
            onComplete?.();
          }}
        />
      );
    },
    []
  );

  const trigger = useCallback(() => {
    triggerRef.current?.();
  }, []);

  return { Confetti: ConfettiComponent, trigger };
}

import { useState } from 'react';

export default Confetti;
