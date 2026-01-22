import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  projects: Project[];
  lang: 'en' | 'es';
}

const ProjectCarousel: React.FC<Props> = ({ projects, lang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation Physics State
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const reqIdRef = useRef<number | null>(null);

  // Clone items x4 to ensure smooth infinite scrolling buffer
  const items = [...projects, ...projects, ...projects, ...projects];

  // 1. Resize Observer for Exact Sizing
  useEffect(() => {
    const updateSize = () => {
      // Wrap in requestAnimationFrame to prevent ResizeObserver loop error
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          const gap = 24; // 1.5rem gap
          
          // Breakpoint logic: < 768px (1 col), >= 768px (2 cols)
          let cardW = width;
          if (window.innerWidth >= 768) {
            cardW = (width - gap) / 2;
          }
          
          containerRef.current.style.setProperty('--card-width', `${cardW}px`);
        }
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // 2. Main Animation Loop
  useEffect(() => {
    const gap = 24;
    const baseSpeed = 0.5;
    const lerpFactor = 0.1;

    const animate = () => {
      if (!trackRef.current || !containerRef.current) return;

      const cardWStr = containerRef.current.style.getPropertyValue('--card-width');
      const cardW = parseFloat(cardWStr) || 0;
      
      if (cardW === 0) {
        reqIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const singleSetWidth = (cardW + gap) * projects.length;

      // 1. Update Target (Where we want to go)
      if (!isHovered) {
        targetXRef.current += baseSpeed;
      }

      // 2. Infinite Loop Handling
      if (targetXRef.current >= singleSetWidth) {
        targetXRef.current -= singleSetWidth;
        currentXRef.current -= singleSetWidth;
      } else if (targetXRef.current < 0) {
        targetXRef.current += singleSetWidth;
        currentXRef.current += singleSetWidth;
      }

      // 3. Interpolation
      const diff = targetXRef.current - currentXRef.current;
      
      if (Math.abs(diff) < 0.01) {
        currentXRef.current = targetXRef.current;
      } else {
        currentXRef.current += diff * lerpFactor;
      }

      // 4. Apply Render
      trackRef.current.style.transform = `translate3d(${-currentXRef.current}px, 0, 0)`;

      reqIdRef.current = requestAnimationFrame(animate);
    };

    reqIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [projects.length, isHovered]);

  // 3. Interaction Logic
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    
    if (!containerRef.current) return;
    
    const cardWStr = containerRef.current.style.getPropertyValue('--card-width');
    const cardW = parseFloat(cardWStr) || 0;
    if (cardW === 0) return;

    const gap = 24;
    const stride = cardW + gap;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Snap Logic
    const centerOffset = (containerWidth - cardW) / 2;
    const currentX = currentXRef.current;
    
    const k = Math.round((currentX + centerOffset) / stride);
    const snapTarget = k * stride - centerOffset;
    
    targetXRef.current = snapTarget;
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const cardWStr = containerRef.current.style.getPropertyValue('--card-width');
    const cardW = parseFloat(cardWStr) || 0;
    const gap = 24;
    const stride = cardW + gap;

    if (direction === 'right') {
      targetXRef.current += stride;
    } else {
      targetXRef.current -= stride;
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 -my-10 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track */}
      <div 
        ref={trackRef}
        className="flex gap-6 w-max will-change-transform"
      >
        {items.map((project, index) => (
          <div 
            key={`${project.id}-${index}`} 
            style={{ width: 'var(--card-width, 300px)' }}
            className="flex-shrink-0 flex flex-col"
          >
             <div className="flex-1 h-full">
               <ProjectCard data={project} lang={lang} />
             </div>
          </div>
        ))}
      </div>
      
      {/* Desktop Navigation Buttons (Hidden on Mobile) */}
      <div className="hidden md:flex absolute inset-y-0 left-0 items-center pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
        <button
          onClick={() => handleScroll('left')}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-primary hover:text-black hover:scale-110 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
        <button
          onClick={() => handleScroll('right')}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-primary hover:text-black hover:scale-110 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Mobile Navigation Buttons (Bottom Center) */}
      <div className="flex md:hidden absolute bottom-3 left-0 right-0 justify-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
        <button
          onClick={() => handleScroll('left')}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/90 border border-slate-700 text-white hover:bg-primary hover:text-black active:scale-95 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/90 border border-slate-700 text-white hover:bg-primary hover:text-black active:scale-95 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Scroll Right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default ProjectCarousel;