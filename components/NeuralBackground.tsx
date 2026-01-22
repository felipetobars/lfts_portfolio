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
    
    // Configuration
    const particleColor = 'rgba(56, 189, 248,'; // Primary color (Sky-400) base
    const lineColor = 'rgba(129, 140, 248,'; // Secondary color (Indigo-400) base
    const particleCount = Math.floor((width * height) / 15000); // Responsive count
    const connectionDistance = 150;
    const mouseDistance = 200;

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
      canvas.width = width;
      canvas.height = height;
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
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000); 
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
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouseDistance) {
          // Calculate pull force (stronger when closer)
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
        const opacity = distMouse < mouseDistance ? 0.8 : 0.3;
        ctx.fillStyle = `${particleColor} ${opacity})`;
        ctx.fill();

        // 4. Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            // Line opacity based on distance between particles AND proximity to mouse
            let lineOpacity = 1 - distance / connectionDistance;
            
            // Highlight lines near mouse
            if (distMouse < mouseDistance) {
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

      requestAnimationFrame(animate);
    };

    // Setup
    canvas.width = width;
    canvas.height = height;
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
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