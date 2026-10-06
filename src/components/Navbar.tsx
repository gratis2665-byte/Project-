import React, { useState } from 'react';
import { UserCheck, Share2, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenGuestModal: () => void;
  onReopenCover: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGuestModal, onReopenCover }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Mempelai', href: '#mempelai' },
    { label: 'Acara', href: '#acara' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Ucapan', href: '#doa-ucapan' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#081b13]/90 backdrop-blur-md border-b border-[#d4af37]/25 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-base sm:text-lg font-display font-bold tracking-tight text-[#f5ebd9] hover:text-[#d4af37] transition-colors whitespace-nowrap"
        >
          Faris &amp; Zulaikha
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#c8bcab]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#d4af37] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenGuestModal}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#071911] bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#aa820a] hover:from-[#c59a35] hover:to-[#be9312] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            title="Atur Tautan Tamu Khusus"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Atur Link Tamu</span>
            <span className="sm:hidden">Link Tamu</span>
          </button>

          <button
            onClick={onReopenCover}
            className="p-1.5 text-xs font-medium text-[#d4af37] hover:text-white bg-[#0e3526] border border-[#d4af37]/30 rounded-lg transition-colors cursor-pointer"
            title="Buka Sampul Warkah"
            aria-label="Buka Sampul Warkah"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#d4af37] hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071811] border-b border-[#d4af37]/25 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-[#c8bcab] hover:text-[#d4af37] py-1.5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
