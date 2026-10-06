import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';
import { PucukRebungDivider } from './MalayOrnaments';

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Busana Adat Diraja Tenun Siak',
    category: 'adat',
    subtitle: 'Mahligai Tradisi',
    description: 'Mempelai mengenakan pakaian kebesaran tenun songket Siak Sri Indrapura bernuansa hijau zamrud dengan sulaman benang emas kelingkan.',
    imageUrl: '', // Will use rich styled cultural canvas visual
  },
  {
    id: 'photo-2',
    title: 'Mahkota Sunting Melayu & Daun Sirih Dara',
    category: 'adat',
    subtitle: 'Keanggunan Ratu Sehari',
    description: 'Untaian melati ronce dan kilauan sunting emas melambangkan kemurnian serta kehormatan seorang anak dara Melayu.',
    imageUrl: '',
  },
  {
    id: 'photo-3',
    title: 'Destar Tanjak & Keris Pusaka Warisan',
    category: 'adat',
    subtitle: 'Kewibawaan Raja Sehari',
    description: 'Tengkolok bertatahkan kerongsang emas diraja dengan selipan hulu keris berukir pucuk rebung lambang kepemimpinan dan amanah.',
    imageUrl: '',
  },
  {
    id: 'photo-4',
    title: 'Prosesi Malam Berinai & Tepuk Tepung Tawar',
    category: 'adat',
    subtitle: 'Doa Restu Sesepuh Adat',
    description: 'Renjisan air mawar dan semburan beras kunyit oleh para datuk dan datin sebagai doa tolak bala dan keberkahan rumah tangga.',
    imageUrl: '',
  },
  {
    id: 'photo-5',
    title: 'Janji Kasih di Tepian Muara Siak',
    category: 'prewedding',
    subtitle: 'Sajak Alam Semesta',
    description: 'Momen penuh kehangatan saat senja melabuhkan cahayanya di tepian sungai bersejarah, saksi bisu awal mula kisah kasih.',
    imageUrl: '',
  },
  {
    id: 'photo-6',
    title: 'Tepak Sirih Hantaran Pelangkah',
    category: 'detail',
    subtitle: 'Simbol Kekerabatan',
    description: 'Gubahan sirih junjung bersusun daun sirih temu urat, kapur, gambir, dan pinang lambang tata krama merisik serta meminang.',
    imageUrl: '',
  },
];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="galeri" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-2">
            Dokumentasi Kenangan
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-gold-shimmer mb-3">
            Galeri Foto Interaktif
          </h2>
          <p className="text-xs sm:text-sm text-[#c8bcab] max-w-lg mx-auto">
            Untaian momen indah perjalanan cinta dan penghormatan adat istiadat leluhur Melayu yang penuh makna.
          </p>
          <PucukRebungDivider className="my-6" />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'Semua Momen' },
              { id: 'adat', label: 'Busana & Adat' },
              { id: 'prewedding', label: 'Kisah Kasih' },
              { id: 'detail', label: 'Hantaran & Ornamen' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#d4af37] text-[#071911] font-semibold shadow-md'
                    : 'bg-[#0d2a1d] text-[#cfc2af] hover:text-white border border-[#d4af37]/25 hover:border-[#d4af37]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#092217] border border-[#d4af37]/30 shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Rich Visual Container with Styled Cultural Artwork */}
              <div className="relative aspect-4/3 w-full bg-gradient-to-br from-[#0c3123] via-[#092016] to-[#06150e] flex items-center justify-center p-6 overflow-hidden">
                {/* Background Geometric Melayu Lattice */}
                <div className="absolute inset-0 bg-songket opacity-40 group-hover:opacity-60 transition-opacity" />
                
                {/* SVG Visual Accent for each card */}
                <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#0e3b2a]/90 border border-[#d4af37]/60 flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Camera className="w-7 h-7 text-[#d4af37]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
                    {photo.subtitle}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#f5ecd8] mt-1 max-w-[200px] leading-tight">
                    {photo.title}
                  </h4>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white z-20">
                  <div className="p-3 bg-[#d4af37] text-[#071911] rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Card Footer Information */}
              <div className="p-4 bg-[#0a2318] border-t border-[#d4af37]/20">
                <div className="flex items-center justify-between text-xs text-[#a3b8aa] mb-1">
                  <span className="capitalize">{photo.category === 'adat' ? 'Adat Istiadat' : photo.category}</span>
                  <span className="text-[#d4af37] text-[11px]">Lihat Foto &rsaquo;</span>
                </div>
                <p className="text-xs text-[#d1c5b4] line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white z-50 transition-colors cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white z-50 transition-colors cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white z-50 transition-colors cursor-pointer"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#082016] rounded-2xl border border-[#d4af37]/50 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Photo Display Canvas */}
              <div className="relative aspect-16/10 w-full bg-gradient-to-b from-[#0b2b1e] to-[#05130d] flex items-center justify-center p-8 text-center">
                <div className="space-y-4 max-w-lg">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#0e3b2a] border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-xl">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                    {activePhoto.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {activePhoto.title}
                  </h3>
                </div>
              </div>

              {/* Photo Description Details */}
              <div className="p-6 bg-[#071a12] border-t border-[#d4af37]/30">
                <div className="flex items-center justify-between text-xs text-[#d4af37] mb-2 font-medium">
                  <span>Foto {activePhotoIndex! + 1} dari {filteredPhotos.length}</span>
                  <span className="uppercase tracking-wider">Momen Walimatul &apos;Ursy</span>
                </div>
                <p className="text-sm text-[#e0d6c6] leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
