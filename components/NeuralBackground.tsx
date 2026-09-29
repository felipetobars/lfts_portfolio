import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Cap DPR to avoid expensive high-density canvas rendering.
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    
    // Configuration
    const particleColor = 'rgba(56, 189, 248,'; // Blue base
    const lineColor = 'rgba(16, 185, 129,'; // Emerald base
    const connectionDistance = 150;
    const mouseDistance = 200;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    const mouseDistanceSq = mouseDistance * mouseDistance;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number; // To return to original flow if needed, or just drift
      baseY: number;
    }

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 }; // Start off screen

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const area = window.innerWidth * window.innerHeight;
      // Slightly lower density and hard cap to keep O(n^2) connections under control.
      const count = Math.min(110, Math.floor(area / 22000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5, // Slow float velocity
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
        });
      }
    };

    // Animation Loop
    let rafId = 0;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p, i) => {
        // 1. Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // 2. Mouse Interaction (The "Pinch" / Attraction)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distMouseSq < mouseDistanceSq && distMouseSq > 0.0001) {
          // Calculate pull force (stronger when closer)
          const distMouse = Math.sqrt(distMouseSq);
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;
          const force = (mouseDistance - distMouse) / mouseDistance;
          
          // Gentle attraction (pinch effect)
          const directionX = forceDirectionX * force * 2; 
          const directionY = forceDirectionY * force * 2;

          p.x += directionX;
          p.y += directionY;
        }

        // 3. Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Opacity based on mouse proximity
        const opacity = distMouseSq < mouseDistanceSq ? 0.8 : 0.3;
        ctx.fillStyle = `${particleColor} ${opacity})`;
        ctx.fill();

        // 4. Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < connectionDistanceSq) {
            ctx.beginPath();
            // Line opacity based on squared distance and mouse proximity.
            let lineOpacity = 1 - distanceSq / connectionDistanceSq;
            
            // Highlight lines near mouse
            if (distMouseSq < mouseDistanceSq) {
                lineOpacity += 0.3; 
            } else {
                lineOpacity *= 0.15; // Dim lines far from mouse
            }

            ctx.strokeStyle = `${lineColor} ${lineOpacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    // Setup
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 bg-[#0B1120] pointer-events-none"
    />
  );
};

export default NeuralBackground;