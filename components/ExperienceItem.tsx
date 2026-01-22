import React, { useState } from 'react';
import { Experience } from '../types';
import ImageModal from './ImageModal';
import { ZoomIn, Video, PlayCircle, ChevronDown, ChevronUp, ArrowUpRight, Users, Phone, Mail, Linkedin } from 'lucide-react';

interface Props {
  data: Experience;
  lang: 'en' | 'es';
}

const ExperienceItem: React.FC<Props> = ({ data, lang }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReferences, setShowReferences] = useState(false);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/400x300/1e293b/94a3b8?text=Image+Unavailable";
  };

  // Helper to parse links within a string segment
  // Supports [Label](Url) format
  const parseContentWithLinks = (content: string) => {
    const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, index) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-white hover:underline decoration-dotted underline-offset-4 transition-colors z-20 relative inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {linkMatch[1]}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Function to parse the text and render bold tags and proper spacing
  const renderRichText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const trimmedLine = line.trim();
      // Check if it's a bullet point
      const isBullet = trimmedLine.startsWith('•');

      // If it is a bullet, remove the bullet char from the text to avoid double rendering
      let cleanLine = isBullet ? trimmedLine.substring(1).trim() : trimmedLine;
      cleanLine = cleanLine.replace(/^>\s*/, ''); // Remove blockquote chars if present

      // Split by double asterisks for bolding
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

      return (
        <div
          key={i}
          className={`mb-1.5 text-sm leading-relaxed text-justify ${isBullet ? 'pl-4 relative' : ''} ${trimmedLine === '' ? 'h-2' : ''}`}
        >
          {isBullet && (
            <span className="absolute left-0 text-primary opacity-70">•</span>
          )}
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              // Parse links INSIDE bold tags too
              const content = part.slice(2, -2);
              return <strong key={j} className="text-slate-200 font-semibold">{parseContentWithLinks(content)}</strong>;
            }
            // Parse links in normal text
            return <span key={j}>{parseContentWithLinks(part)}</span>;
          })}
        </div>
      );
    });
  };

  // Duplicate items to create seamless infinite loop effect for the carousel
  const originalItems = data.media || [];
  const carouselItems = [...originalItems, ...originalItems];
  // Speed up animation: Reduced multiplier from 4 to 2.5 to accommodate larger lists faster
  const animationDuration = `${Math.max(20, originalItems.length * 2.5)}s`;

  return (
    <>
      {selectedIndex !== null && data.media && (
        <ImageModal
          mediaList={data.media}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          lang={lang}
        />
      )}

      <div className="relative pl-8 sm:pl-32 py-8 group">
        {/* Vertical Line Connector */}
        <div className="absolute left-0 sm:left-[7.5rem] top-0 bottom-0 w-px bg-slate-800 group-hover:bg-gradient-to-b group-hover:from-primary group-hover:to-transparent transition-all duration-500 hidden sm:block"></div>

        {/* Dot on Line */}
        <div className="absolute left-[-5px] sm:left-[7.2rem] top-10 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-primary group-hover:bg-background transition-all duration-300 hidden sm:block z-10"></div>

        <div className="flex flex-col sm:flex-row items-start mb-1">
          <div className="text-xs font-bold uppercase tracking-wide text-muted sm:absolute sm:left-0 sm:w-24 sm:text-right mt-1.5 group-hover:text-primary transition-colors">
            {data.period}
          </div>
          <div className="sm:ml-4 w-full">
            <h3 className="font-bold text-xl text-light group-hover:text-primary transition-colors duration-200">
              {data.role}
            </h3>
            <div className="text-secondary font-medium mb-3 text-sm tracking-wide">{data.company}</div>

            {/* General Description (Always Visible) - Now using Rich Text Renderer */}
            <div className="text-muted mb-4 group-hover:text-slate-300 transition-colors">
              {renderRichText(data.description)}
            </div>

            {/* Actions Bar (Show More / References) */}
            <div className="flex gap-6 mb-5">
              {data.details && (
                <button
                  onClick={() => {
                    const willOpen = !showDetails;
                    setShowDetails(willOpen);
                    if (willOpen) setShowReferences(false);
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:text-white transition-colors uppercase tracking-wider focus:outline-none"
                >
                  {showDetails ? (
                    <>
                      {lang === 'en' ? 'Show Less' : 'Mostrar Menos'} <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      {lang === 'en' ? 'Show More' : 'Mostrar Más'} <ChevronDown size={14} />
                    </>
                  )}
                </button>
              )}

              {data.references && (
                <button
                  onClick={() => {
                    const willOpen = !showReferences;
                    setShowReferences(willOpen);
                    if (willOpen) setShowDetails(false);
                  }}
                  className="flex items-center gap-2 text-xs font-bold text-secondary hover:text-white transition-colors uppercase tracking-wider focus:outline-none"
                >
                  <Users size={14} />
                  {lang === 'en' ? 'References' : 'Referencias'}
                  {showReferences ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              )}
            </div>

            {/* Expandable Details Section - Increased max-h to accomodate large content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDetails ? 'max-h-[3000px] opacity-100 mb-5' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-800 text-slate-400">
                {data.details && renderRichText(data.details)}
              </div>
            </div>

            {/* Expandable References Section */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showReferences ? 'max-h-[500px] opacity-100 mb-5' : 'max-h-0 opacity-0'}`}>
              <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  {lang === 'en' ? 'Contact References' : 'Referencias de Contacto'}
                </h4>
                {data.references?.map((ref, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-md bg-slate-900/50 border border-slate-800">
                    <div>
                      <div className="font-bold text-slate-200 text-sm">{ref.name}</div>
                      <div className="text-xs text-slate-500">{ref.role}</div>
                    </div>
                    <div className="flex gap-3 text-slate-400">
                      {ref.phone && (
                        <a href={`tel:${ref.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors" title="Call">
                          <Phone size={16} />
                        </a>
                      )}
                      {ref.email && (
                        <a href={`mailto:${ref.email}`} className="hover:text-primary transition-colors" title="Email">
                          <Mail size={16} />
                        </a>
                      )}
                      {ref.linkedin && (
                        <a href={ref.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" title="LinkedIn">
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Carousel - Inserted between Description and Technologies */}
            {data.media && data.media.length > 0 && (
              <div className="relative w-full border border-slate-700/30 bg-slate-900/20 rounded-lg overflow-hidden py-3 mb-5 group/carousel">
                <div
                  className="flex gap-3 w-max animate-scroll hover:[animation-play-state:paused]"
                  style={{ animationDuration: animationDuration }}
                >
                  {carouselItems.map((mediaItem, idx) => {
                    const realIndex = idx % originalItems.length;
                    return (
                      <div
                        key={`${idx}-${mediaItem.url}`}
                        className="flex-shrink-0 w-32 h-20 rounded overflow-hidden border border-slate-700/50 cursor-pointer relative group/media bg-slate-900 shadow-md hover:border-primary/50 transition-all"
                        onClick={() => setSelectedIndex(realIndex)}
                      >
                        {mediaItem.type === 'video' && !mediaItem.thumbnailUrl ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500 gap-1 group-hover/media:bg-slate-700 transition-colors">
                            <Video className="w-5 h-5 opacity-50 group-hover/media:opacity-100 group-hover/media:scale-110 transition-all" />
                            <span className="text-[8px] font-mono tracking-tighter opacity-70">VIDEO</span>
                          </div>
                        ) : (
                          <img
                            src={mediaItem.thumbnailUrl || mediaItem.url}
                            alt={`Experience media thumbnail`}
                            onError={handleImgError}
                            className="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 group-hover/media:scale-110 transition-all duration-500"
                            loading="lazy"
                          />
                        )}

                        <div className="absolute inset-0 bg-black/30 group-hover/media:bg-black/10 transition-colors flex items-center justify-center">
                          {mediaItem.type === 'video' ? (
                            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover/media:scale-110 transition-transform">
                              <PlayCircle className="w-4 h-4 text-white fill-white/20" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity">
                              <ZoomIn className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background/80 to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/80 to-transparent pointer-events-none z-10"></div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-slate-800/50 text-primary rounded-md text-xs font-medium border border-slate-700/50 hover:border-primary/50 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceItem;