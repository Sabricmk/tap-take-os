
"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  update: () => void;
  draw: () => void;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 50;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(color: string) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Smaller particles
        this.speedX = Math.random() * 0.5 - 0.25; // Slower speeds
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = color;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.1) this.size -= 0.005; // Particles fade slowly

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (ctx && this.size > 0.1) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    
    const accentColorStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const primaryColorStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();

    function hslToHex(hslStr: string): string {
        if (!hslStr) return "#B274EF"; // Default accent if CSS var is empty

        let parts = hslStr.match(/(\d+)\s*(\d+)%\s*(\d+)%/); // Changed const to let
        if (!parts) { // If regex doesn't match, try direct HSL parsing if it's just numbers
          const directParts = hslStr.split(" ").map(p => p.replace('%',''));
          if (directParts.length === 3) {
            parts = [hslStr, directParts[0], directParts[1], directParts[2]];
          } else {
            return "#B274EF"; // Fallback if parsing fails
          }
        }
        
        let h = parseInt(parts[1]);
        let s = parseInt(parts[2]);
        let l = parseInt(parts[3]);

        s /= 100;
        l /= 100;
        const k = (n:number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n:number) =>
            l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        
        const toHex = (val: number) => Math.round(val * 255).toString(16).padStart(2, '0');
        return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
    }


    const particleColor1 = hslToHex(accentColorStyle) || '#B274EF'; // Accent
    const particleColor2 = hslToHex(primaryColorStyle) || '#597081'; // Primary

    function init() {
      particles.length = 0; 
      for (let i = 0; i < particleCount; i++) {
        particles.push(new ParticleImpl(i % 2 === 0 ? particleColor1 : particleColor2));
      }
    }

    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        
        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].size <= 0.1) {
                particles.splice(i, 1);
                particles.push(new ParticleImpl(Math.random() > 0.5 ? particleColor1: particleColor2));
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20" />;
};

export default ParticleCanvas;
