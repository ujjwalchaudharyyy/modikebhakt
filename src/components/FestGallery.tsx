import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { FEST_GALLERY } from '../data/festData';
import { GalleryItem } from '../types/fest';
import { soundManager } from '../utils/audio';

export const FestGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Events' },
    { id: 'hackathon', label: 'Hackathon & CTF' },
    { id: 'gaming', label: 'E-Sports' },
    { id: 'campus', label: 'Treasure Hunt' },
    { id: 'keynote', label: 'Workshop' }
  ];

  const filteredItems = FEST_GALLERY.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handleOpenLightbox = (item: GalleryItem) => {
    soundManager.playModalOpen();
    setSelectedImage(item);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    soundManager.playClick();
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    soundManager.playClick();
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="relative py-24 border-t border-slate-800/80 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">GALLERY</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A quick look at the main events of NIRVAN '26.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                soundManager.playClick();
                setActiveFilter(f.id);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono-code font-semibold whitespace-nowrap transition-all ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30'
                  : 'cyber-glass text-slate-300 hover:text-white hover:border-cyan-500/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative rounded-2xl overflow-hidden cursor-pointer cyber-glass border-slate-800 hover:border-cyan-400 transition-all duration-300 shadow-xl transform hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Tags */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-cyan-300 font-mono-code text-[10px] backdrop-blur-md">
                  Edition {item.year}
                </span>
                <span className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-300 group-hover:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-mono-code text-purple-400 uppercase tracking-wider block">
                  {item.category.toUpperCase()}
                </span>
                <h4 className="font-orbitron font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-300 text-xs line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full border border-slate-700"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-slate-950">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />

                {/* Left / Right Nav Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Bar */}
              <div className="w-full mt-4 p-4 rounded-2xl cyber-glass border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono-code text-[11px]">
                      {selectedImage.category.toUpperCase()} • {selectedImage.year}
                    </span>
                  </div>
                  <h3 className="font-orbitron font-bold text-base text-white">{selectedImage.title}</h3>
                  <p className="text-slate-300 text-xs mt-0.5">{selectedImage.caption}</p>
                </div>

                <div className="text-right font-mono-code text-xs text-slate-400">
                  <span>
                    {filteredItems.findIndex((i) => i.id === selectedImage.id) + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
