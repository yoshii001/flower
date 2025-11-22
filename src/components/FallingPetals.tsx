import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  opacity: number;
  size: number;
  wobble: number;
  wobbleSpeed: number;
  depth: number;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const petalColors = [
      'rgba(251, 113, 133, ',
      'rgba(253, 164, 175, ',
      'rgba(252, 165, 165, ',
      'rgba(249, 168, 212, ',
      'rgba(253, 186, 116, ',
    ];

    const createPetal = (): Petal => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.4 + 0.3,
      size: Math.random() * 12 + 6,
      wobble: Math.random() * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      depth: Math.random(),
    });

    for (let i = 0; i < 40; i++) {
      petalsRef.current.push(createPetal());
    }

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);

      const color = petalColors[Math.floor(petal.y) % petalColors.length];
      ctx.fillStyle = color + petal.opacity + ')';

      ctx.beginPath();
      ctx.ellipse(0, 0, petal.size, petal.size * 1.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((petal) => {
        petal.y += petal.speed * (1 + petal.depth * 0.5);
        petal.rotation += petal.rotationSpeed;
        petal.wobble += petal.wobbleSpeed;
        petal.x += Math.sin(petal.wobble) * (1 + petal.depth);

        if (petal.y > canvas.height + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvas.width;
        }

        if (petal.x < -20) petal.x = canvas.width + 20;
        if (petal.x > canvas.width + 20) petal.x = -20;

        drawPetal(petal);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
