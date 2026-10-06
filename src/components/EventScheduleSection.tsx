import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Navigation,
  Sparkles,
  Shirt,
} from 'lucide-react';
import { PucukRebungDivider, SongketCorner } from './MalayOrnaments';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';

interface EventScheduleSectionProps {
  config?: WeddingConfig;
}

export const EventScheduleSection: React.FC<EventScheduleSectionProps> = ({ config = DEFAULT_WEDDING_CONFIG }) => {
  const googleMapsUrl = 'https://maps.google.com/?q=' + encodeURIComponent(config.venueName + ' ' + config.venueAddress);
  const wazeUrl = 'https://waze.com/ul?q=' + encodeURIComponent(config.venueName);

  return (
    <section id="acara" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-songket-dense/40">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-2">
            Rangkaian Majlis
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-gold-shimmer mb-3">
            Waktu &amp; Tempat Acara
          </h2>
          <p className="text-xs sm:text-sm text-[#c8bcab] max-w-lg mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>
          <PucukRebungDivider className="my-6" />
        </div>

        {/* 2 Event Schedule Cards: Akad Nikah & Resepsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Akad Nikah & Tepuk Tepung Tawar */}
          <div className="relative bg-gradient-to-b from-[#0b2b1e] to-[#071912] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <SongketCorner position="top-left" />
            <SongketCorner position="top-right" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e3a29] border border-[#d4af37]/40 text-[#f5e197] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Majlis Ijab Qabul &amp; Adat</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                Akad Nikah &amp; Tepuk Tepung Tawar
              </h3>
              <p className="text-xs text-[#a3b8aa] mb-6">
                Upacara sakral pengucapan ijab qabul dan prosesi adat Tepuk Tepung Tawar pemberi restu para tetua adat.
              </p>

              <div className="space-y-4 text-sm text-[#e8ded0] mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.weddingDateDisplay}</p>
                    <p className="text-xs text-[#b8ab97]">13 Rabiul Akhir 1448 H</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.akadTime}</p>
                    <p className="text-xs text-[#b8ab97]">Prosesi Adat Dimulai Tepat Pukul 09.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.venueName}</p>
                    <p className="text-xs text-[#b8ab97] leading-relaxed">
                      {config.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between text-xs text-[#d4af37]">
              <span>Khusus Kerabat &amp; Tamu Kehormatan</span>
              <span className="font-semibold">Sesi Pagi</span>
            </div>
          </div>

          {/* Majlis Bersanding / Resepsi */}
          <div className="relative bg-gradient-to-b from-[#0b2b1e] to-[#071912] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <SongketCorner position="top-left" />
            <SongketCorner position="top-right" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e3a29] border border-[#d4af37]/40 text-[#f5e197] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Majlis Bersanding Diraja</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                Walimatul &apos;Ursy (Resepsi)
              </h3>
              <p className="text-xs text-[#a3b8aa] mb-6">
                Perarakan pengantin, jamuan santapan beradat khas Melayu serumpun, dan ramah tamah bersama seluruh undangan.
              </p>

              <div className="space-y-4 text-sm text-[#e8ded0] mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.weddingDateDisplay}</p>
                    <p className="text-xs text-[#b8ab97]">13 Rabiul Akhir 1448 H</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.resepsiTime}</p>
                    <p className="text-xs text-[#b8ab97]">Perarakan Pengantin Diraja Pukul 13.30 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{config.venueName}</p>
                    <p className="text-xs text-[#b8ab97] leading-relaxed">
                      {config.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between text-xs text-[#d4af37]">
              <span>Tamu Undangan &amp; Sanak Saudara</span>
              <span className="font-semibold">Sesi Siang &amp; Sore</span>
            </div>
          </div>
        </div>

        {/* Dress Code & Tata Krama Tamu */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-[#0b271b]/80 border border-[#d4af37]/25 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="p-3 bg-[#0e3c2b] rounded-xl border border-[#d4af37]/30 text-[#d4af37] shrink-0">
            <Shirt className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h5 className="font-display font-semibold text-white text-sm sm:text-base mb-1">
              Panduan Busana (Dress Code)
            </h5>
            <p className="text-xs text-[#cfc2af] leading-relaxed">
              Tamu pria dianjurkan mengenakan Baju Melayu / Teluk Belanga dengan samping songket atau kemeja Batik sopan. Tamu wanita dianjurkan mengenakan Baju Kurung / Kebaya Labuh bernuansa warna <strong className="text-[#f5e197]">Hijau Zamrud (Emerald), Emas Songket, atau Champagne Ivory</strong>.
            </p>
          </div>
        </div>

        {/* Interactive Location Map & Navigation Buttons */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#082016] border border-[#d4af37]/35 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
                <MapPin className="w-4 h-4" />
                <span>Peta Petunjuk Arah Lokasi</span>
              </div>
              <h4 className="text-lg sm:text-xl font-display font-bold text-white">
                Balai Adat Lembaga Adat Melayu Riau
              </h4>
              <p className="text-xs text-[#baa995] mt-0.5">
                Jl. Diponegoro No. 18, Pekanbaru (Tepat di seberang Taman Diponegoro)
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-[#c29d2b] text-[#071911] rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e3b2a] hover:bg-[#134e38] text-white border border-[#d4af37]/40 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-md"
              >
                <ExternalLink className="w-4 h-4 text-[#d4af37]" />
                <span>Petunjuk Waze</span>
              </a>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden border border-[#d4af37]/30 shadow-inner bg-[#0a2317]">
            <iframe
              title="Peta Lokasi Pernikahan Balai Adat Melayu"
              src="https://maps.google.com/maps?q=Balai+Adat+Melayu+Riau+Jl+Diponegoro+Pekanbaru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-105 brightness-95"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9fb8a9] gap-2">
            <span>Tersedia area parkir luas dengan layanan valet untuk tamu VIP di sayap kiri Balai Adat.</span>
            <span className="text-[#d4af37]">Koordinat: 0.5283° N, 101.4485° E</span>
          </div>
        </div>
      </div>
    </section>
  );
};
