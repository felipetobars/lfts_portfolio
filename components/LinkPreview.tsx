import React, { useState, useEffect } from 'react';
import { ExternalLink, ImageOff } from 'lucide-react';

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  previewImage?: string; // Optional static image to override generator
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ href, children, className, previewImage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Logic: 
  // If previewImage is provided (like for CITAE), use it directly.
  // Otherwise, use the WordPress mshots generator for the website screenshot.
  const imgSrc = previewImage || `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(href)}?w=400&h=300`;
  const isStatic = !!previewImage;

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    const img = new Image();
    img.src = imgSrc;
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
        setIsLoaded(true);
        setHasError(true);
    };

    // Cleanup not strictly necessary for simple Image object but good practice
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imgSrc]);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={href} 
        target="_blank" 
        rel="noreferrer" 
        className={className}
      >
        {children}
      </a>
      
      {/* Preview Tooltip */}
      <div 
        className={`
          absolute left-1/2 -translate-x-1/2 z-50
          w-56 h-36 bg-slate-900 border border-slate-700 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden
          transition-all duration-300 pointer-events-none transform origin-bottom
          ${isHovered ? 'opacity-100 translate-y-2 scale-100' : 'opacity-0 translate-y-4 scale-95'}
        `}
        style={{ top: '100%' }}
      >
        {/* Loading / Background */}
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
          {!isLoaded && !hasError && (
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          )}
           {hasError && (
             <div className="flex flex-col items-center text-slate-500 gap-2">
                <ImageOff className="w-8 h-8 opacity-50" />
                <span className="text-[10px] uppercase tracking-wider font-bold">No Preview</span>
             </div>
          )}
        </div>
        
        {/* Image */}
        {isLoaded && !hasError && (
          <img 
            src={imgSrc} 
            alt="Preview" 
            className={`
              relative w-full h-full animate-in fade-in duration-300
              ${isStatic ? 'object-contain bg-black p-2' : 'object-cover'}
            `}
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none">
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] text-white/80 font-mono truncate max-w-[80%]">
                    {new URL(href).hostname.replace('www.', '')}
                </span>
                <ExternalLink className="w-3 h-3 text-white/60" />
            </div>
        </div>
      </div>
    </span>
  );
};

export default LinkPreview;