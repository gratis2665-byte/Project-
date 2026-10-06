import React from 'react';

/**
 * Ornamen Pucuk Rebung (Motif Songket Khas Melayu)
 * Simbol kesuburan, keluhuran budi, dan perlindungan
 */
export const PucukRebungDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 opacity-90 ${className}`}>
    <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37] w-12 sm:w-20" />
    <svg className="w-8 h-8 text-[#d4af37]" viewBox="0 0 40 40" fill="currentColor">
      {/* Pucuk Rebung triangle stylized motif */}
      <path d="M20 2 L26 14 L23 15 L28 24 L24 25 L30 36 L10 36 L16 25 L12 24 L17 15 L14 14 Z" opacity="0.9" fill="url(#goldGradient)" />
      <circle cx="20" cy="18" r="2" fill="#fff7d6" />
      <circle cx="20" cy="27" r="2.5" fill="#fff7d6" />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2cc" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7407" />
        </linearGradient>
      </defs>
    </svg>
    <div className="h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37] w-12 sm:w-20" />
  </div>
);

/**
 * Tepak Sirih Emblem (Simbol Adat Melayu Penghormatan Tetamu)
 */
export const TepakSirihIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor">
    <path
      d="M8 32 C8 24 16 20 24 12 C32 20 40 24 40 32 C40 38 32 40 24 40 C16 40 8 38 8 32 Z"
      fill="rgba(212, 175, 55, 0.15)"
      stroke="#d4af37"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 12 L24 38 M16 24 C20 26 24 28 24 34 M32 24 C28 26 24 28 24 34"
      stroke="#f5e197"
      strokeWidth="1.5"
    />
    <circle cx="24" cy="10" r="2.5" fill="#d4af37" />
  </svg>
);

/**
 * Mahkota Sunting & Tanjak Diraja Accent
 */
export const TanjakSuntingEmblem: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    {/* Destar/Tanjak crown silhouette */}
    <path
      d="M12 46 L32 14 L52 46 L39 43 L32 50 L25 43 Z"
      fill="url(#goldEmblem)"
      stroke="#d4af37"
      strokeWidth="1.5"
    />
    <path
      d="M32 14 L32 48 M22 34 L42 34"
      stroke="#ffffff"
      strokeWidth="1.2"
      opacity="0.75"
    />
    <circle cx="32" cy="12" r="3" fill="#fff7d6" />
    <defs>
      <linearGradient id="goldEmblem" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7e096" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#8c6803" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Bingkai Sudut Songket Emas (Corner Borders)
 */
export const SongketCorner: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  position,
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'rotate(90deg)';
      case 'bottom-right':
        return 'rotate(180deg)';
      case 'bottom-left':
        return 'rotate(270deg)';
      default:
        return 'none';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-2 right-2';
      case 'bottom-right':
        return 'bottom-2 right-2';
      case 'bottom-left':
        return 'bottom-2 left-2';
      default:
        return 'top-2 left-2';
    }
  };

  return (
    <div
      className={`absolute ${getPositionClasses()} pointer-events-none w-8 h-8 sm:w-12 sm:h-12 text-[#d4af37]/70`}
      style={{ transform: getTransform() }}
    >
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" className="w-full h-full">
        <path d="M2 2 L22 2 M2 2 L2 22" strokeWidth="2.5" />
        <path d="M6 6 L18 6 M6 6 L6 18" strokeWidth="1.2" opacity="0.6" />
        <path d="M10 2 L2 10 M14 2 L2 14 M18 2 L2 18" strokeWidth="1" opacity="0.4" />
        <circle cx="2" cy="2" r="2" fill="#d4af37" />
      </svg>
    </div>
  );
};
