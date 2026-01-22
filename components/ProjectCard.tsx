import React, { useState } from 'react';
import { Project } from '../types';
import { FolderGit2, ArrowUpRight, Github, ZoomIn, PlayCircle, Video, GraduationCap, Cpu } from 'lucide-react';
import ImageModal from './ImageModal';
import { ICONS } from '../constants';

interface Props {
  data: Project;
  lang: 'en' | 'es';
}

const ProjectCard: React.FC<Props> = ({ data, lang }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/400x300/1e293b/94a3b8?text=Image+Unavailable";
  };

  const handleContextClick = () => {
    const educationSection = document.getElementById('education');
    if (educationSection) {
      educationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine links to display (Support new links array or legacy repoUrl)
  const links = data.links || (data.repoUrl ? [{
    url: data.repoUrl,
    type: data.repoUrl.includes('researchgate') ? 'researchgate' : 'github'
  }] : []);

  // Determine primary link for the Title click (prefer Github for code context if available, otherwise first link)
  const primaryLink = data.repoUrl || (data.links && data.links.length > 0 ? data.links[0].url : undefined);

  // Duplicate items to create seamless infinite loop effect
  const originalItems = data.media || [];
  const carouselItems = [...originalItems, ...originalItems];
  const animationDuration = '25s';

  const renderIcon = (type: string) => {
    if (type === 'researchgate') {
      return (
        <div className="w-[18px] h-[18px] flex items-center justify-center">
          {ICONS.ResearchGate}
        </div>
      );
    }
    // Default to Github for 'github' or 'other'
    return <Github size={18} />;
  };

  const renderBadge = () => {
    if (!data.academicContext) return null;

    if (data.academicContext === 'applied') {
      return (
        <div className="mb-2 relative z-10">
          <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full cursor-default select-none border border-emerald-400/20">
            <Cpu size={12} />
            {lang === 'en' ? 'Applied Project' : 'Proyecto Aplicado'}
          </span>
        </div>
      );
    }

    // Default Academic Badge (Bachelor / Specialist)
    return (
      <div className="mb-2 relative z-10">
        <button
          onClick={handleContextClick}
          className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-full hover:bg-secondary/20 transition-colors"
        >
          <GraduationCap size={12} />
          {data.academicContext === 'bachelor'
            ? (lang === 'en' ? 'Bachelor Degree' : 'Pregrado')
            : (lang === 'en' ? 'Postgraduate Specialization' : 'Especialización')
          }
        </button>
      </div>
    );
  };

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

      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-primary/50 hover:bg-slate-800/60 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
        {/* Glow effect on hover */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none"></div>

        <div className="p-6 pb-2 flex-1">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center gap-2 text-primary">
              <FolderGit2 className="w-8 h-8 p-1.5 bg-primary/10 rounded-lg" />
            </div>
            <div className="flex gap-2 items-center">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-all flex items-center justify-center"
                  title={link.type === 'researchgate' ? "View Publication" : "View Repository"}
                >
                  {renderIcon(link.type)}
                </a>
              ))}
              <div className="text-xs font-mono text-muted border border-slate-700 px-2 py-1 rounded">
                {data.year}
              </div>
            </div>
          </div>

          {/* Context Badge */}
          {renderBadge()}

          <h3 className="font-bold text-light text-lg mb-2 flex items-center gap-2 group-hover:text-primary transition-colors relative z-10">
            {primaryLink ? (
              <a href={primaryLink} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-2">
                {data.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
              </a>
            ) : (
              data.title
            )}
          </h3>

          <p className="text-muted text-sm mb-4 leading-relaxed relative z-10 text-justify">
            {data.description}
          </p>
        </div>

        {/* Media Carousel - CSS Infinite Scroll */}
        {data.media && data.media.length > 0 && (
          <div className="relative w-full border-y border-slate-700/30 bg-slate-900/20 overflow-hidden py-4 mt-auto">
            <div
              className="flex gap-3 w-max animate-scroll hover:[animation-play-state:paused]"
              style={{ animationDuration: animationDuration }}
            >
              {carouselItems.map((mediaItem, idx) => {
                const realIndex = idx % originalItems.length;
                return (
                  <div
                    key={`${idx}-${mediaItem.url}`}
                    className="flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden border border-slate-700/50 cursor-pointer relative group/media bg-slate-900 shadow-md hover:border-primary/50 transition-all"
                    onClick={() => setSelectedIndex(realIndex)}
                  >
                    {mediaItem.type === 'video' && !mediaItem.thumbnailUrl ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-500 gap-1 group-hover/media:bg-slate-700 transition-colors">
                        <Video className="w-6 h-6 opacity-50 group-hover/media:opacity-100 group-hover/media:scale-110 transition-all" />
                        <span className="text-[10px] font-mono tracking-tighter opacity-70">VIDEO</span>
                      </div>
                    ) : (
                      <img
                        src={mediaItem.thumbnailUrl || mediaItem.url}
                        alt={`${data.title} thumbnail`}
                        onError={handleImgError}
                        className="w-full h-full object-cover opacity-80 group-hover/media:opacity-100 group-hover/media:scale-110 transition-all duration-500"
                        loading="lazy"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/30 group-hover/media:bg-black/10 transition-colors flex items-center justify-center">
                      {mediaItem.type === 'video' ? (
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover/media:scale-110 transition-transform">
                          <PlayCircle className="w-5 h-5 text-white fill-white/20" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-900/60 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-900/60 to-transparent pointer-events-none z-10"></div>
          </div>
        )}

        {data.technologies && (
          <div className="p-6 pt-2 flex flex-wrap gap-2 relative z-10">
            {data.technologies.map((tech) => (
              <span key={tech} className="text-[10px] text-slate-300 font-medium bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectCard;