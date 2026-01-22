import React, { useState } from 'react';
import { Education } from '../types';
import { ChevronRight, Eye, ExternalLink } from 'lucide-react';
import ImageModal from './ImageModal';

interface Props {
  data: Education;
  lang?: 'en' | 'es';
}

const EducationItem: React.FC<Props> = ({ data, lang = 'en' }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/300x400/1e293b/94a3b8?text=Image+Error";
  };

  return (
    <>
      {selectedImage && (
        <ImageModal
          mediaList={[{ type: 'image', url: selectedImage }]}
          initialIndex={0}
          onClose={() => setSelectedImage(null)}
          lang={lang}
        />
      )}

      <div className="relative pl-8 border-l border-slate-800 hover:border-primary transition-colors duration-500 group">
        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all"></div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
          {data.degreeUrl ? (
            <h3 className="text-xl font-bold text-light group-hover:text-primary transition-colors">
              <a href={data.degreeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline decoration-primary underline-offset-4 decoration-2">
                {data.degree}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </h3>
          ) : (
            <h3 className="text-xl font-bold text-light group-hover:text-primary transition-colors">{data.degree}</h3>
          )}

          <span className="text-sm font-mono text-primary/80 mt-1 sm:mt-0">{data.period}</span>
        </div>

        <div className="text-secondary font-medium mb-1">{data.institution}</div>

        {data.details && (
          <ul className="list-none space-y-1 mb-4">
            {data.details.map((detail, idx) => (
              <li key={idx} className="text-sm text-muted flex items-start">
                <ChevronRight className="w-4 h-4 mr-2 text-primary/50 flex-shrink-0 mt-0.5" />
                {detail}
              </li>
            ))}
          </ul>
        )}

        {/* Documents Thumbnails */}
        {data.documents && data.documents.length > 0 && (
          <div className="flex gap-4 mt-3">
            {data.documents.map((doc, idx) => (
              <div
                key={idx}
                className="relative group/doc cursor-pointer"
                onClick={() => setSelectedImage(doc.url)}
              >
                <div className="w-12 h-16 bg-slate-800 rounded border border-slate-700 overflow-hidden group-hover/doc:border-primary group-hover/doc:shadow-lg transition-all duration-300">
                  <img
                    src={doc.url}
                    alt={doc.label}
                    onError={handleImgError}
                    className="w-full h-full object-cover opacity-60 group-hover/doc:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  {/* Hover Overlay Icon */}
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
      </div>
    </>
  );
};

export default EducationItem;