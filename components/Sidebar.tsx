import React, { useState, useEffect, useRef } from 'react';
import { ICONS } from '../constants';
import { ResumeData } from '../types';
import { FileText, File, Download, X, ArrowUpRight } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  isAtTop: boolean;
  data: ResumeData;
  navLinks: { name: string; href: string }[];
  lang: 'en' | 'es';
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, isAtTop, data, navLinks, lang }) => {
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);

  // Using lh3.googleusercontent.com for reliable direct image embedding from Drive
  const profileImg = 'https://lh3.googleusercontent.com/d/131MnOpUtrZupdIHiM94r5pcgk25ZRUt-';
  // Fallback avatar in case the Drive link has permission issues
  const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0F172A&color=38BDF8&size=256&bold=true`;

  // Auto-scroll sidebar logic
  useEffect(() => {
    if (isAtTop) {
      sidebarRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeSection) {
      const activeLinkElement = document.getElementById(`nav-item-${activeSection}`);
      if (activeLinkElement) {
        // 'nearest' ensures it only scrolls if the element is not currently visible
        activeLinkElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeSection, isAtTop]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = fallbackImg;
  };

  return (
    <>
      {/* Full Screen Image Modal */}
      {isImgModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setIsImgModalOpen(false)}
        >
          <img
            src={profileImg}
            alt={data.name}
            onError={handleImgError}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
        </div>
      )}

      {/* CV Selection Modal */}
      {isCvModalOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="absolute inset-0" onClick={() => setIsCvModalOpen(false)}></div>
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl relative z-10 w-full max-w-sm transform scale-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsCvModalOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-8 text-center tracking-tight">
              {lang === 'en' ? 'Select Format' : 'Seleccionar Formato'}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://drive.google.com/file/d/1h00ciZ7D082Bq_elEX6pgUmG9zTKGfv8/view"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsCvModalOpen(false)}
                className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
              >
                <FileText className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">PDF</span>
              </a>

              <a
                href="https://drive.google.com/file/d/1GvAuuhaG1f4GlUefemZL2-meoPF9_fWf/view"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsCvModalOpen(false)}
                className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 group"
              >
                <File className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">DOCX</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <header
        ref={sidebarRef}
        className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-96 w-full bg-slate-900/80 backdrop-blur-md border-r border-slate-800 text-slate-300 flex flex-col z-50 transition-all duration-300 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
      >
        {/* Decorative gradient blob */}
        <div className="absolute top-0 left-0 w-full h-64 bg-primary/10 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        {/* Profile Header */}
        <div className="p-8 lg:p-10 flex flex-col items-start space-y-5 flex-shrink-0 relative">

          {/* Profile Image Container */}
          <div
            className="relative group cursor-zoom-in self-center lg:self-start mb-2"
            onClick={() => setIsImgModalOpen(true)}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            {/* Increased size: w-32/h-32 on mobile, w-48/h-48 on desktop */}
            <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full bg-slate-800 relative ring-4 ring-slate-700 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src={profileImg}
                alt={data.name}
                onError={handleImgError}
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          <div className="w-full cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
              {data.name.split(' ').slice(0, 2).join(' ')} <br />
              <span className="text-slate-400">{data.name.split(' ').slice(2).join(' ')}</span>
            </h1>

            <div className="text-xs font-bold tracking-wide text-primary uppercase mt-3 mb-1 leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
              {data.title.map((item, idx) => (
                <span key={idx} className="flex items-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:underline transition-colors decoration-dotted underline-offset-4"
                  >
                    {item.label}
                  </a>
                  {idx < data.title.length - 1 && (
                    <span className="ml-2 text-slate-600 select-none">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3 text-sm mt-4 w-full">
            <a href={`mailto:${data.contact.email}`} className="flex items-center gap-3 text-muted hover:text-white transition-colors duration-200 group">
              <span className="p-2 bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-all">{ICONS.Mail}</span>
              <span className="flex items-center gap-2 truncate">
                {data.contact.email}
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </span>
            </a>
            <a
              href="https://www.google.com/maps/place/Medell%C3%ADn,+Antioquia"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-muted hover:text-white transition-colors duration-200 group"
            >
              <span className="p-2 bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-all">{ICONS.MapPin}</span>
              <span className="flex items-center gap-2">
                {data.contact.location}
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </span>
            </a>

            <a href={`tel:${data.contact.phone}`} className="flex items-center gap-3 text-muted hover:text-white transition-colors duration-200 group">
              <span className="p-2 bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-all">{ICONS.Phone}</span>
              <span className="flex items-center gap-2">
                {data.contact.phone}
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </span>
            </a>

            {/* WhatsApp Item */}
            <a
              href="https://wa.me/573013189355"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-muted hover:text-white transition-colors duration-200 group"
            >
              <span className="p-2 bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-all">
                {ICONS.Whatsapp}
              </span>
              <span className="flex items-center gap-2">
                WhatsApp
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
              </span>
            </a>
          </div>

          <div className="flex gap-4 mt-6">
            {data.contact.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300" title="LinkedIn">
                {ICONS.Linkedin}
              </a>
            )}
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300" title="GitHub">
                {ICONS.Github}
              </a>
            )}
            {data.contact.orcid && (
              <a href={data.contact.orcid} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300" title="ORCID">
                {ICONS.Orcid}
              </a>
            )}
            {data.contact.researchgate && (
              <a href={data.contact.researchgate} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300" title="ResearchGate">
                {ICONS.ResearchGate}
              </a>
            )}
          </div>

          {/* Download CV Small Link Style */}
          <div className="mt-6 w-full">
            <button
              onClick={() => setIsCvModalOpen(true)}
              className="group flex items-center gap-2 text-xs font-bold tracking-wide uppercase hover:opacity-80 transition-opacity duration-300 w-full text-left"
            >
              <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary">
                {lang === 'en' ? 'Download CV' : 'Descargar CV'}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex flex-col px-10 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-item-${link.href.substring(1)}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`group flex items-center py-3 text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer ${activeSection === link.href.substring(1)
                ? 'text-white'
                : 'text-slate-500 hover:text-slate-200'
                }`}
            >
              <span className={`h-0.5 rounded-full transition-all duration-300 mr-4 bg-gradient-to-r from-primary to-secondary ${activeSection === link.href.substring(1) ? 'w-12 opacity-100' : 'w-4 opacity-30 group-hover:w-8 group-hover:opacity-70'
                }`}></span>
              {link.name.toUpperCase()}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="hidden lg:block px-10 pb-8 pt-6 text-xs text-slate-600 mt-auto">
          <p>
            {lang === 'en' ? 'Designed by' : 'Diseñado por'} felipetobars © {new Date().getFullYear()}
          </p>
        </div>
      </header>
    </>
  );
};

export default Sidebar;