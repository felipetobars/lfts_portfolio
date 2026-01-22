import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectMedia } from '../types';

interface ImageModalProps {
  mediaList: ProjectMedia[];
  initialIndex: number;
  onClose: () => void;
  lang?: 'en' | 'es';
}

const ImageModal: React.FC<ImageModalProps> = ({ mediaList, initialIndex, onClose, lang = 'en' }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const media = mediaList[currentIndex];
  const isVideo = media.type === 'video';

  // Robust check for YouTube URLs
  const isYoutube = isVideo && (
    media.url.includes('youtube.com') ||
    media.url.includes('youtu.be')
  );

  // Helper to extract clean Video ID regardless of input URL format
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const externalUrl = (() => {
    if (isYoutube) {
      // Always generate a clean watch URL
      const id = getYouTubeId(media.url);
      return id ? `https://www.youtube.com/watch?v=${id}` : media.url;
    }
    if (media.url.includes('/preview')) {
      return media.url.replace('/preview', '/view');
    }
    return media.url;
  })();

  const externalLabel = isYoutube ? "Watch on YouTube" : "Open in Drive";

  // Navigation Logic
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1); // Reset zoom on change
    setPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  }, [mediaList.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  }, [mediaList.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev, onClose]);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => Math.min(s + 0.5, 5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => Math.max(s - 0.5, 0.5));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (isVideo) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isVideo) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const onMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (isVideo) return;
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, scale + delta), 5);
    setScale(newScale);
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/800x600/1e293b/94a3b8?text=Image+Load+Error";
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onClick={onClose}
    >
      {/* --- Toolbar --- */}
      <div className="flex items-center justify-between p-4 z-50 w-full max-w-7xl mx-auto pointer-events-none" onClick={(e) => e.stopPropagation()}>
        {/* Counter */}
        <div className="pointer-events-auto bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 text-xs font-mono text-slate-400">
          {currentIndex + 1} / {mediaList.length}
        </div>

        <div className="flex items-center">
          {/* Video Fallback Button */}
          {isVideo && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto mr-4 flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full text-white text-xs font-bold border border-slate-700 hover:bg-primary hover:text-black hover:border-primary transition-all shadow-lg"
              title={externalLabel}
            >
              {externalLabel} <ExternalLink size={14} />
            </a>
          )}

          {!isVideo && (
            <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800 shadow-xl backdrop-blur-md mr-4">
              <button onClick={handleZoomOut} className="p-2 hover:bg-slate-700 text-slate-200 rounded transition-colors" title="Zoom Out"><ZoomOut size={20} /></button>
              <span className="text-xs font-mono text-slate-500 w-12 text-center">{Math.round(scale * 100)}%</span>
              <button onClick={handleZoomIn} className="p-2 hover:bg-slate-700 text-slate-200 rounded transition-colors" title="Zoom In"><ZoomIn size={20} /></button>
              <div className="w-px h-6 bg-slate-700 mx-1"></div>
              <button onClick={handleReset} className="p-2 hover:bg-slate-700 text-slate-200 rounded transition-colors" title="Reset View"><RotateCcw size={20} /></button>
            </div>
          )}

          <button
            onClick={onClose}
            className="pointer-events-auto p-3 bg-slate-900/80 rounded-full text-slate-400 hover:text-white hover:bg-red-500/20 border border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-xl"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div
        className="flex-1 relative flex items-center justify-center overflow-hidden w-full h-full p-0 md:p-10"
      >
        {/* Navigation Arrows - Only show if more than 1 item */}
        {mediaList.length > 1 && (
          <>
            <button
              onClick={(e) => handlePrev(e)}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/40 hover:bg-primary hover:text-black text-white border border-white/10 hover:border-primary backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => handleNext(e)}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/40 hover:bg-primary hover:text-black text-white border border-white/10 hover:border-primary backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Media Content */}
        <div
          className={`w-full h-full flex items-center justify-center ${isVideo ? '' : 'cursor-grab active:cursor-grabbing'}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onWheel={handleWheel}
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo && isYoutube ? (
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-slate-800">
              {/* Exact parameters matching user's provided YouTube embed code */}
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(media.url)}`}
                className="w-full h-full"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ) : isVideo ? (
            /* Fallback for non-YouTube videos (not used currently but good for safety) */
            <video src={media.url} controls className="max-w-full max-h-full rounded-lg shadow-2xl" />
          ) : (
            <img
              src={media.url}
              alt="Fullscreen View"
              onError={handleImgError}
              className="max-w-full max-h-full object-contain shadow-2xl rounded transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
              draggable={false}
            />
          )}
        </div>
      </div>

      {!isVideo && (
        <div className="text-center pb-6 text-xs text-slate-500 font-mono pointer-events-none absolute bottom-0 w-full opacity-50 z-10">
          {lang === 'es'
            ? "Scroll para zoom • Arrastrar para mover • Flechas para navegar"
            : "Scroll to zoom • Drag to pan • Arrows to navigate"}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ImageModal;