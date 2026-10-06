import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MailOpen, Sparkles, Music } from 'lucide-react';
import { malayAudioEngine } from '../utils/audioPlayer';
import { PucukRebungDivider, SongketCorner, TepakSirihIcon, TanjakSuntingEmblem } from './MalayOrnaments';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';

interface HeroCoverModalProps {
  guestName: string;
  isOpen: boolean;
  onOpenInvitation: () => void;
  config?: WeddingConfig;
}

export const HeroCoverModal: React.FC<HeroCoverModalProps> = ({
  guestName,
  isOpen,
  onOpenInvitation,
  config = DEFAULT_WEDDING_CONFIG,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpen = () => {
    setIsOpening(true);
    // Start traditional background music
    malayAudioEngine.start();

    // Trigger celebratory gold confetti shower
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f3e5ab', '#065f46', '#ffd700', '#ffffff'],
    });

    setTimeout(() => {
      onOpenInvitation();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 overflow-hidden ${
        isOpening ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
      }`}
    >
      {/* 1. Backdrop Ambience */}
      <div className="absolute inset-0 bg-[#06140f] z-0" />

      {/* 2. Tirai Songket Diraja Kiri (Royal Left Curtain - z-10) */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#04160f] via-[#062117] to-[#0a2f21] border-r border-[#d4af37]/50 shadow-2xl transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] z-10 ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-songket opacity-40" />
        {/* Renda Emas Rumbai Songket */}
        <div className="absolute top-0 bottom-0 right-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#d4af37] via-[#fff2cc] to-[#aa820a] shadow-md opacity-70" />
      </div>

      {/* 3. Tirai Songket Diraja Kanan (Royal Right Curtain - z-10) */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#04160f] via-[#062117] to-[#0a2f21] border-l border-[#d4af37]/50 shadow-2xl transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] z-10 ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="absolute inset-0 bg-songket opacity-40" />
        {/* Renda Emas Rumbai Songket */}
        <div className="absolute top-0 bottom-0 left-0 w-1.5 sm:w-2 bg-gradient-to-b from-[#d4af37] via-[#fff2cc] to-[#aa820a] shadow-md opacity-70" />
      </div>

      {/* 4. Royal Invitation Envelope Card (Tampil di depan tirai dengan z-20) */}
      <div
        className={`relative z-20 w-full max-w-lg bg-gradient-to-b from-[#0b271d] via-[#082016] to-[#051610] rounded-2xl border-2 border-[#d4af37]/60 shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] p-6 sm:p-10 text-center text-[#f7f3e8] overflow-hidden transition-all duration-700 ${
          isOpening
            ? 'opacity-0 scale-95 -translate-y-8'
            : 'animate-malay-unfold opacity-100 scale-100'
        }`}
      >
        {/* Ornate Gold Corners */}
        <SongketCorner position="top-left" />
        <SongketCorner position="top-right" />
        <SongketCorner position="bottom-left" />
        <SongketCorner position="bottom-right" />

        {/* Gerbang Selaso Jatuh / Arch Golden Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        {/* Top Heraldry / Emblems with Royal Glow */}
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-[#0d3425] rounded-full border border-[#d4af37] shadow-inner animate-malay-glow">
            <TanjakSuntingEmblem className="w-10 h-10 text-[#d4af37]" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-1">
          Warkah Undangan Diraja
        </p>
        <p className="font-arabic text-lg sm:text-xl text-[#f3e5ab] mb-2 dir-rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <h1 className="text-2xl sm:text-3xl font-display font-bold text-gold-shimmer mb-1 tracking-wide">
          {config.groomName} &amp; {config.brideName}
        </h1>

        <p className="text-xs text-[#dcd1be] tracking-widest uppercase mb-4">
          Walimatul &apos;Ursy Adat Melayu Serumpun
        </p>

        <PucukRebungDivider className="my-2" />

        {/* Personalized Guest Box */}
        <div className="my-5 p-4 sm:p-5 rounded-xl bg-[#0e3527]/80 border border-[#d4af37]/40 shadow-inner">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#d4af37] mb-1 font-medium">
            <TepakSirihIcon className="w-4 h-4 text-[#d4af37]" />
            <span>Kepada Yth. Tamu Kehormatan</span>
          </div>
          <p className="text-lg sm:text-xl font-display font-semibold text-white tracking-wide break-words">
            {guestName || 'Bapak/Ibu/Saudara/i'}
          </p>
          <p className="text-[11px] text-[#b8ab92] mt-1 italic">
            Mohon maaf bila ada kesalahan penulisan nama atau gelar
          </p>
        </div>

        {/* Traditional Welcome Pantun */}
        <div className="text-xs sm:text-sm text-[#e6ded0] font-quote italic leading-relaxed mb-6 px-2">
          &ldquo;Bunga melur cempaka sari, harum semerbak di taman puspa.<br className="hidden sm:inline" />
          Selamat datang sanak saudari, meraikan kasih dua mempelai bersempena.&rdquo;
        </div>

        {/* CTA Button to Open Envelope */}
        <div className="space-y-3">
          <button
            onClick={handleOpen}
            className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#aa820a] hover:from-[#c59a35] hover:to-[#be9312] text-[#071911] font-display font-bold text-sm sm:text-base rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden border border-[#fff2cc]/40"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <MailOpen className="w-5 h-5 text-[#071911]" />
            <span className="tracking-wider">Buka Warkah Undangan</span>
            <Sparkles className="w-4 h-4 text-[#071911]" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#9fb8a9]">
            <Music className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>Alunan musik tradisional Melayu akan berkumandang</span>
          </div>
        </div>
      </div>
    </div>
  );
};
