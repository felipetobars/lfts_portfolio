import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import ExperienceItem from './components/ExperienceItem';
import ProjectCard from './components/ProjectCard';
import ProjectCarousel from './components/ProjectCarousel';
import SkillGroup from './components/SkillGroup';
import EducationItem from './components/EducationItem';
import NeuralBackground from './components/NeuralBackground';
import { RESUME_DATA, NAVIGATION_LINKS } from './constants';
import { Award, Languages, ArrowDown, ExternalLink, Eye, FileText } from 'lucide-react';
import ImageModal from './components/ImageModal';

// Helper to format text with bullet points
const formatAboutText = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('•')) {
      currentList.push(trimmed.substring(1).trim());
    } else {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc pl-6 space-y-4 mb-6 text-slate-300 marker:text-primary">
            {currentList.map((item, i) => <li key={i} className="pl-2 text-justify leading-relaxed">{item}</li>)}
          </ul>
        );
        currentList = [];
      }
      elements.push(<p key={`p-${index}`} className="text-slate-300 text-lg leading-loose mb-6 text-justify">{trimmed}</p>);
    }
  });

  if (currentList.length > 0) {
    elements.push(
      <ul key="list-end" className="list-disc pl-6 space-y-4 mb-6 text-slate-300 marker:text-primary">
        {currentList.map((item, i) => <li key={i} className="pl-2 text-justify leading-relaxed">{item}</li>)}
      </ul>
    );
  }

  return elements;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [loaded, setLoaded] = useState(false);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

  const data = RESUME_DATA[lang];
  const navLinks = NAVIGATION_LINKS[lang];

  // Filter Academic projects by context
  // Include both 'specialist' AND 'applied' in the first grouping
  const specialistProjects = data.academicProjects.filter(
    p => p.academicContext === 'specialist' || p.academicContext === 'applied'
  );
  const bachelorProjects = data.academicProjects.filter(p => p.academicContext === 'bachelor');

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      // Check if at top (Hero section)
      setIsAtTop(window.scrollY < 100);

      const sections = navLinks.map(link => link.href.substring(1));

      // 1. Bottom of page check
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      // 2. Robust ScrollSpy: Find the last section that has crossed the trigger line
      // Trigger line is 35% down the viewport height. 
      // This works better for short screens or tall sections than checking a narrow band.
      const triggerPoint = window.innerHeight * 0.35;
      let current = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the trigger point, it's the current candidate.
          if (rect.top <= triggerPoint) {
            current = section;
          } else {
            // Stop once we find a section that hasn't started yet
            break;
          }
        }
      }

      setActiveSection(current);
    };

    // Run once on mount to set initial active state correctly
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/300x400/1e293b/94a3b8?text=Image+Error";
  };

  return (
    <div className="bg-background min-h-screen text-slate-400 selection:bg-primary selection:text-background font-sans overflow-x-hidden">

      {/* Interactive Neural Background */}
      <NeuralBackground />

      <Sidebar activeSection={activeSection} isAtTop={isAtTop} data={data} navLinks={navLinks} lang={lang} />

      {selectedCertImage && (
        <ImageModal
          mediaList={[{ type: 'image', url: selectedCertImage }]}
          initialIndex={0}
          onClose={() => setSelectedCertImage(null)}
        />
      )}

      <main className="lg:pl-96 w-full relative z-10 pointer-events-none">
        {/* Pointer events auto enables interaction for children like buttons/text, but lets mouse pass through to body for canvas tracking if needed, 
            though we attached the listener to window so it works everywhere. 
            We put pointer-events-auto on sections to ensure text selection works. */}

        {/* HERO SECTION - High Impact */}
        <section className="min-h-screen flex flex-col justify-center px-6 lg:px-24 relative pointer-events-auto">
          <div className={`transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-primary font-mono mb-4 text-lg">
              {lang === 'en' ? 'Hi, I am' : 'Hola, soy'} {data.name.split(' ')[0]}
            </h2>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {lang === 'en'
                ? <>Bridging advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Machine Learning</span> <br /> with impactful solutions <br /> through collaboration and innovation.</>
                : <>Uniendo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Machine Learning</span> avanzado <br /> con soluciones de impacto <br /> mediante colaboración e innovación.</>
              }
            </h1>
            <p className="text-2xl font-bold max-w-2xl leading-relaxed mb-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {lang === 'en'
                  ? "Mechatronics Engineer & Artificial Intelligence Specialist."
                  : "Ingeniero Mecatrónico y Especialista en Inteligencia Artificial."
                }
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-primary text-primary hover:bg-primary/10 transition-all rounded font-mono text-sm flex items-center justify-center gap-2 group"
              >
                {lang === 'en' ? 'Explore Profile' : 'Explorar Perfil'}
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 pb-24 lg:px-24 space-y-32 pointer-events-auto">

          {/* ABOUT SECTION */}
          <section id={navLinks[0].href.substring(1)} className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-light mb-8 flex items-center tracking-tight">
              {navLinks[0].name}
              <span className="text-primary text-4xl ml-1 leading-none">.</span>
            </h2>
            <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                {formatAboutText(data.about)}
              </div>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id={navLinks[1].href.substring(1)} className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-light mb-12 flex items-center">
              <span className="w-12 h-px bg-slate-700 mr-4"></span>
              {navLinks[1].name}
            </h2>
            <div className="space-y-6">
              {data.experience.map((job) => (
                <ExperienceItem key={job.id} data={job} lang={lang} />
              ))}
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id={navLinks[2].href.substring(1)} className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-light mb-12 flex items-center">
              <span className="w-12 h-px bg-slate-700 mr-4"></span>
              {navLinks[2].name}
            </h2>
            <div className="flex flex-col gap-8">
              {data.skills.map((cat) => (
                <SkillGroup key={cat.category} data={cat} />
              ))}
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id={navLinks[3].href.substring(1)} className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-light mb-12 flex items-center">
              <span className="w-12 h-px bg-slate-700 mr-4"></span>
              {navLinks[3].name}
            </h2>

            <div className="space-y-16">
              {/* Work Projects Subheader - Only show if there are items */}
              {data.workProjects && data.workProjects.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-6 border-l-4 border-secondary pl-4 relative z-20">
                    {lang === 'en' ? 'Work Projects' : 'Proyectos Laborales'}
                  </h3>
                  <ProjectCarousel projects={data.workProjects} lang={lang} />
                </div>
              )}

              {/* Specialist Projects Subheader */}
              {specialistProjects.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-6 border-l-4 border-secondary pl-4 relative z-20">
                    {lang === 'en' ? 'Postgraduate Specialization & Applied Projects' : 'Especialización y Proyectos Aplicados'}
                  </h3>
                  <ProjectCarousel projects={specialistProjects} lang={lang} />
                </div>
              )}

              {/* Bachelor Projects Subheader */}
              {bachelorProjects.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-primary uppercase tracking-wider mb-6 border-l-4 border-secondary pl-4 relative z-20">
                    {lang === 'en' ? 'Bachelor Degree Projects' : 'Proyectos de Pregrado'}
                  </h3>
                  <ProjectCarousel projects={bachelorProjects} lang={lang} />
                </div>
              )}
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section id={navLinks[4].href.substring(1)} className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-light mb-12 flex items-center">
              <span className="w-12 h-px bg-slate-700 mr-4"></span>
              {navLinks[4].name}
            </h2>
            <div className="space-y-12">
              {data.education.map((edu) => (
                <EducationItem key={edu.id} data={edu} lang={lang} />
              ))}
            </div>
          </section>

          {/* ADDITIONAL INFO */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-800/50">
            <div className="bg-slate-800/20 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-light mb-6 flex items-center gap-3">
                <Award className="w-5 h-5 text-secondary" /> {lang === 'en' ? 'Certifications' : 'Certificaciones'}
              </h3>
              <ul className="space-y-6">
                {data.certifications.map((cert, index) => (
                  <li key={index} className="group">
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noreferrer" className="font-medium text-slate-300 group-hover:text-primary transition-colors flex items-center gap-2 hover:underline decoration-primary underline-offset-4 decoration-2 w-fit">
                        {cert.name}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <div className="font-medium text-slate-300 group-hover:text-primary transition-colors">{cert.name}</div>
                    )}

                    <div className="flex justify-between text-xs text-slate-500 mt-1 mb-2">
                      <span>{cert.issuer}</span>
                      <span className="font-mono">{cert.date}</span>
                    </div>

                    {cert.documents && cert.documents.length > 0 && (
                      <div className="flex gap-4 mt-2">
                        {cert.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="relative group/doc cursor-pointer"
                            onClick={() => setSelectedCertImage(doc.url)}
                          >
                            <div className="w-12 h-16 bg-slate-800 rounded border border-slate-700 overflow-hidden group-hover/doc:border-primary group-hover/doc:shadow-lg transition-all duration-300">
                              <img
                                src={doc.url}
                                alt={doc.label}
                                onError={handleImgError}
                                className="w-full h-full object-cover opacity-60 group-hover/doc:opacity-100 transition-opacity"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/doc:opacity-100 transition-opacity">
                                <Eye className="w-4 h-4 text-white drop-shadow-md" />
                              </div>
                            </div>
                            <span className="text-[10px] text-slate-500 mt-1 block text-center truncate w-12 group-hover/doc:text-primary transition-colors">
                              {doc.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/20 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-light mb-6 flex items-center gap-3">
                <Languages className="w-5 h-5 text-secondary" /> {lang === 'en' ? 'Languages' : 'Idiomas'}
              </h3>
              <div className="flex flex-col gap-3">
                {data.languages.map((l, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded bg-slate-900/50 border border-slate-700/50">
                    <span className="font-medium text-slate-300">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="h-24 flex items-center justify-center text-slate-600 text-sm font-mono">
            {lang === 'en' ? 'Designed by' : 'Diseñado por'} felipetobars © {new Date().getFullYear()}
          </div>

        </div>
      </main>

      {/* Language Switcher FAB */}
      <button
        onClick={toggleLanguage}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-800 rounded-full shadow-2xl border border-slate-700 hover:border-primary hover:scale-110 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Toggle Language"
      >
        <span className="text-2xl filter drop-shadow-lg grayscale group-hover:grayscale-0 transition-all">
          {lang === 'en' ? '🇪🇸' : '🇺🇸'}
        </span>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        </span>
      </button>

    </div>
  );
};

export default App;