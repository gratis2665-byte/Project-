import React from 'react';
import { PucukRebungDivider, TepakSirihIcon, TanjakSuntingEmblem } from './MalayOrnaments';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';

interface HeroSectionProps {
  guestName: string;
  config?: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName, config = DEFAULT_WEDDING_CONFIG }) => {
  return (
    <section id="top" className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-songket opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0f4430]/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Emblem */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-[#0d3425]/80 rounded-full border border-[#d4af37]/40 shadow-inner">
            <TanjakSuntingEmblem className="w-12 h-12 text-[#d4af37]" />
          </div>
        </div>

        {/* Personalized Guest Welcome Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e3527]/90 border border-[#d4af37]/40 shadow-sm text-xs text-[#f5ebd9] mb-6">
          <TepakSirihIcon className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Selamat Datang,</span>
          <strong className="text-[#f5e197] font-semibold">{guestName || 'Bapak/Ibu/Saudara/i Tamu Terhormat'}</strong>
        </div>

        {/* Bismillah */}
        <p className="font-arabic text-xl sm:text-2xl text-[#f3e5ab] mb-3 dir-rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-2">
          Walimatul &apos;Ursy Adat Melayu Diraja
        </p>

        {/* Couple Names */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-gold-shimmer tracking-tight mb-4">
          {config.groomName} <span className="text-[#d4af37] font-serif font-normal">&amp;</span> {config.brideName}
        </h1>

        <p className="font-quote text-base sm:text-xl text-[#ded3c2] max-w-2xl mx-auto italic leading-relaxed mb-6">
          &ldquo;Sekapur sirih seulas pinang, adat dijunjung budi dikenang.<br className="hidden sm:inline" />
          Dengan segala kerendahan hati, kami menjemput sanak saudara ke majlis raja sehari.&rdquo;
        </p>

        <PucukRebungDivider className="my-6" />
      </div>
    </section>
  );
};
