import React from 'react';
import { PucukRebungDivider, TanjakSuntingEmblem } from './MalayOrnaments';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';
import { Settings } from 'lucide-react';

interface FooterProps {
  onOpenGuestModal: () => void;
  onReopenCover: () => void;
  onOpenAdmin: () => void;
  config?: WeddingConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuestModal,
  onReopenCover,
  onOpenAdmin,
  config = DEFAULT_WEDDING_CONFIG,
}) => {
  return (
    <footer className="pt-16 pb-24 px-4 sm:px-6 bg-[#05130d] border-t border-[#d4af37]/25 text-center text-[#ded3c2] relative">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-3">
          <TanjakSuntingEmblem className="w-10 h-10 text-[#d4af37]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-bold text-gold-shimmer mb-1">
          {config.groomName} &amp; {config.brideName}
        </h3>
        <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-medium mb-4">
          Walimatul &apos;Ursy Adat Melayu Diraja
        </p>

        <p className="font-quote text-sm sm:text-base text-[#cfc2af] italic leading-relaxed max-w-lg mx-auto mb-6">
          &ldquo;Kayuh perahu ke Pulau Rupat, singgah bersauh di Teluk Rhu.<br />
          Doa restu yang ikhlas terhajat, mengiringi kasih mempelai berpadu.&rdquo;
        </p>

        <PucukRebungDivider className="my-6" />

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#a3b8aa] mb-6">
          <button
            onClick={onReopenCover}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Buka Sampul Warkah
          </button>
          <span>·</span>
          <button
            onClick={onOpenGuestModal}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Generator Tautan Tamu
          </button>
          <span>·</span>
          <a href="#acara" className="hover:text-[#d4af37] transition-colors">
            Petunjuk Lokasi
          </a>
          <span>·</span>
          <a href="#doa-ucapan" className="hover:text-[#d4af37] transition-colors">
            Kesan &amp; Doa Restu
          </a>
          <span>·</span>
          <button
            onClick={onOpenAdmin}
            className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors inline-flex items-center gap-1 cursor-pointer"
            title="Kelola Pengaturan Web (Fitur Pengantin)"
          >
            <Settings className="w-3 h-3" />
            <span>Kelola Web</span>
          </button>
        </div>

        <p className="text-[11px] text-[#7a8c80]">
          Merupakan suatu kebahagiaan dan kehormatan besar bagi kami sekeluarga atas kehadiran dan doa restu Bapak/Ibu/Saudara/i.
        </p>
        <p className="text-[10px] text-[#55695c] mt-2 flex items-center justify-center gap-1.5">
          <span>Adat Melayu Bersendikan Syarak · Syarak Bersendikan Kitabullah</span>
        </p>
      </div>
    </footer>
  );
};
