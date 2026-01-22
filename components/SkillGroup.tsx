import React from 'react';
import { SkillCategory } from '../types';
import { ExternalLink } from 'lucide-react';

interface Props {
  data: SkillCategory;
}

const SkillGroup: React.FC<Props> = ({ data }) => {
  return (
    <div className="mb-10">
      <h4 className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-6 flex items-center border-b border-slate-800 pb-2">
        {data.category}
      </h4>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.skills.map((skill, idx) => {
          const content = (
            <>
              <div className="relative w-10 h-10 mb-3 flex items-center justify-center p-1 bg-slate-950/30 rounded-lg group-hover:scale-110 transition-transform duration-300">
                {skill.icon ? (
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></div>
                )}
              </div>
              
              <div className="text-center z-10">
                <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors block leading-tight">
                  {skill.name}
                </span>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              {/* External Link Icon indicator */}
              {skill.url && (
                <ExternalLink className="absolute top-2 right-2 w-3 h-3 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
              )}
            </>
          );

          const className = "group relative flex flex-col items-center justify-center p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-primary/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer min-h-[110px]";

          return skill.url ? (
            <a 
              key={idx} 
              href={skill.url} 
              target="_blank" 
              rel="noreferrer"
              className={className}
              title={`Visit ${skill.name} documentation`}
            >
              {content}
            </a>
          ) : (
            <div key={idx} className={`${className} cursor-default`}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillGroup;