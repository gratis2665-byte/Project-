import React from 'react';
import { Instagram, Sparkles } from 'lucide-react';
import { PucukRebungDivider, SongketCorner } from './MalayOrnaments';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';

interface CoupleSectionProps {
  config?: WeddingConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config = DEFAULT_WEDDING_CONFIG }) => {
  return (
    <section id="mempelai" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Ayat Suci & Mukadimah */}
        <div className="mb-14">
          <p className="font-arabic text-2xl sm:text-3xl text-[#f3e5ab] mb-3 leading-loose dir-rtl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="font-quote text-base sm:text-lg text-[#ded3c2] max-w-2xl mx-auto italic leading-relaxed">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="text-xs tracking-widest text-[#d4af37] font-semibold mt-2 uppercase">
            — Q.S. Ar-Rum: 21 —
          </p>

          <PucukRebungDivider className="my-6" />

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gold-shimmer mb-2">
            Mempelai Raja &amp; Ratu Sehari
          </h2>
          <p className="text-sm text-[#bcaea0] max-w-xl mx-auto">
            Dengan bertautnya dua hati dalam ikrar suci perkawinan, terukir permulaan sebuah bahtera hidup yang penuh barakah.
          </p>
        </div>

        {/* Both Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-left">
          {/* Groom (Raja Sehari) */}
          <div className="relative bg-gradient-to-b from-[#0a2318] to-[#061811] rounded-2xl border border-[#d4af37]/30 p-6 sm:p-8 shadow-xl overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-300">
            <SongketCorner position="top-left" />
            <SongketCorner position="top-right" />

            {/* Cultural Attire Portrait Artwork */}
            <div className="relative w-40 h-48 sm:w-44 sm:h-52 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-lg bg-[#0e3626]">
              {/* Malay Groom Stylized SVG Visual Asset */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061811] via-transparent to-transparent z-10" />
              <svg viewBox="0 0 200 240" className="w-full h-full object-cover">
                {/* Background Pattern */}
                <rect width="200" height="240" fill="#0b2b1e" />
                <circle cx="100" cy="90" r="60" fill="#133d2c" />
                
                {/* Tanjak Melayu (Groom Headdress) */}
                <path d="M60 70 L100 20 L140 70 L120 65 L100 78 L80 65 Z" fill="#d4af37" stroke="#aa820a" strokeWidth="2" />
                <path d="M100 20 L100 75" stroke="#fff7d6" strokeWidth="1.5" />
                
                {/* Face & Groom silhouette */}
                <circle cx="100" cy="85" r="30" fill="#dfbe9f" />
                {/* Songket Neckline & Baju Melayu Cekak Musang */}
                <path d="M65 115 C65 105 85 105 100 105 C115 105 135 105 135 115 L145 240 L55 240 Z" fill="#08422e" />
                {/* Gold Kerongsang & Songket Trim */}
                <path d="M100 105 L100 190" stroke="#d4af37" strokeWidth="3" strokeDasharray="6,4" />
                {/* Sampin Songket Gold Wrap */}
                <path d="M55 170 C80 165 120 165 145 170 L150 240 L50 240 Z" fill="#aa820a" opacity="0.9" />
                <circle cx="100" cy="120" r="3" fill="#ffe180" />
                <circle cx="100" cy="138" r="3" fill="#ffe180" />
                <circle cx="100" cy="156" r="3" fill="#ffe180" />
              </svg>

              <div className="absolute bottom-2 left-0 right-0 z-20 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] bg-[#071911]/90 px-3 py-0.5 rounded-full border border-[#d4af37]/30">
                  Raja Sehari
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                Pengantin Pria
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {config.groomFullName}
              </h3>
              <p className="text-xs text-[#d4af37] italic mb-4 font-serif">
                {config.groomTitle}
              </p>

              <div className="p-3.5 bg-[#0b291e]/80 rounded-xl border border-[#d4af37]/20 text-xs text-[#cfc2af] leading-relaxed mb-4">
                <p className="font-semibold text-[#f5ebd9] mb-0.5">Putra Pertama dari:</p>
                <p>{config.groomParents}</p>
                <p className="text-[11px] text-[#9ba8a0] mt-1 italic">Pekanbaru, Riau</p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37]/80 hover:text-[#d4af37] transition-colors">
                <Instagram className="w-3.5 h-3.5" />
                <span>@{config.groomInstagram}</span>
              </div>
            </div>
          </div>

          {/* Bride (Ratu Sehari) */}
          <div className="relative bg-gradient-to-b from-[#0a2318] to-[#061811] rounded-2xl border border-[#d4af37]/30 p-6 sm:p-8 shadow-xl overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-300">
            <SongketCorner position="top-left" />
            <SongketCorner position="top-right" />

            {/* Cultural Attire Portrait Artwork */}
            <div className="relative w-40 h-48 sm:w-44 sm:h-52 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-lg bg-[#0e3626]">
              {/* Malay Bride Stylized SVG Visual Asset */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061811] via-transparent to-transparent z-10" />
              <svg viewBox="0 0 200 240" className="w-full h-full object-cover">
                {/* Background Pattern */}
                <rect width="200" height="240" fill="#0b2b1e" />
                <circle cx="100" cy="90" r="60" fill="#133d2c" />
                
                {/* Sunting Melayu (Gold Bridal Crown with Hanging Floral Ornaments) */}
                <path d="M50 55 C65 25 135 25 150 55 C130 50 70 50 50 55 Z" fill="#d4af37" stroke="#9a750a" strokeWidth="1.5" />
                {/* Crown Spikes & Jasmine Petals */}
                <path d="M60 48 L70 18 L80 45 L90 12 L100 45 L110 12 L120 45 L130 18 L140 48" stroke="#ffe180" strokeWidth="2" fill="none" />
                {/* Hanging Jasmine Strings (Untaian Melati) */}
                <path d="M52 55 L48 110 M148 55 L152 110" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3,3" />

                {/* Face & Bride Silhouette */}
                <circle cx="100" cy="85" r="28" fill="#e8c7aa" />
                {/* Veil & Baju Kurung Songket */}
                <path d="M68 115 C70 102 130 102 132 115 L150 240 L50 240 Z" fill="#08422e" />
                {/* Intricate Gold Songket Embroidery */}
                <path d="M85 115 L100 135 L115 115" stroke="#d4af37" strokeWidth="2" fill="none" />
                <path d="M100 135 L100 240" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="5,4" />
                <circle cx="100" cy="150" r="4" fill="#ffd700" />
                <circle cx="100" cy="175" r="4" fill="#ffd700" />
                <circle cx="100" cy="200" r="4" fill="#ffd700" />
              </svg>

              <div className="absolute bottom-2 left-0 right-0 z-20 text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] bg-[#071911]/90 px-3 py-0.5 rounded-full border border-[#d4af37]/30">
                  Ratu Sehari
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                Pengantin Wanita
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                {config.brideFullName}
              </h3>
              <p className="text-xs text-[#d4af37] italic mb-4 font-serif">
                {config.brideTitle}
              </p>

              <div className="p-3.5 bg-[#0b291e]/80 rounded-xl border border-[#d4af37]/20 text-xs text-[#cfc2af] leading-relaxed mb-4">
                <p className="font-semibold text-[#f5ebd9] mb-0.5">Putri Bungsu dari:</p>
                <p>{config.brideParents}</p>
                <p className="text-[11px] text-[#9ba8a0] mt-1 italic">Pekanbaru, Riau</p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37]/80 hover:text-[#d4af37] transition-colors">
                <Instagram className="w-3.5 h-3.5" />
                <span>@{config.brideInstagram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pantun Adat Melayu Penyatuan Jiwa */}
        <div className="mt-12 p-6 rounded-2xl bg-[#092217]/70 border border-[#d4af37]/25 max-w-2xl mx-auto text-center">
          <p className="font-quote text-sm sm:text-base text-[#e5dbcb] italic leading-relaxed">
            &ldquo;Patah rotan meranti teguh, berakit ke hulu membelah muara.<br />
            Dua hati bertaut kukuh, seia sekata hingga ke syurga.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#d4af37] mt-3 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Adat Bersendikan Syarak, Syarak Bersendikan Kitabullah</span>
          </div>
        </div>
      </div>
    </section>
  );
};
