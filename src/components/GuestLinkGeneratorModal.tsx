import React, { useState } from 'react';
import {
  Link2,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Users,
  X,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { PucukRebungDivider, SongketCorner } from './MalayOrnaments';

interface GuestLinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGuest: (name: string) => void;
}

export const GuestLinkGeneratorModal: React.FC<GuestLinkGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSelectGuest,
}) => {
  const [salutation, setSalutation] = useState('Bapak/Ibu');
  const [guestName, setGuestName] = useState('');
  const [copied, setCopied] = useState(false);
  const [waCopied, setWaCopied] = useState(false);

  if (!isOpen) return null;

  const fullNameWithSalutation = guestName.trim()
    ? `${salutation ? salutation + ' ' : ''}${guestName.trim()}`
    : 'Bapak/Ibu Tamu Kehormatan';

  // Construct absolute URL
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const generatedLink = `${baseUrl}?to=${encodeURIComponent(fullNameWithSalutation)}`;

  // Indonesian Malay polite WhatsApp invitation text template
  const whatsappMessage = `*Warkah Jemputan Walimatul 'Ursy (Pernikahan Adat Melayu)*\n\n_Assalamu'alaikum Warahmatullahi Wabarakatuh_\n\nBunga melur cempaka sari,\nHarum semerbak di taman puspa.\nSelamat datang sanak saudari,\nMeraikan kasih dua mempelai bersempena.\n\nKepada Yth. *${fullNameWithSalutation}*,\n\nDengan penuh rasa syukur dan memohon rahmat Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam perhelatan pernikahan kami:\n\n*Tengku Muhammad Faris, S.T., M.Eng.*\n_dengan_\n*Siti Zulaikha Indahsari, S.Farm., Apt.*\n\n🗓 *Sabtu, 24 Oktober 2026*\n📍 *Balai Adat Melayu Riau & Grand Astaka Mahligai, Pekanbaru*\n\nInformasi lengkap rangkaian acara, peta lokasi, dan konfirmasi kehadiran (RSVP) dapat diakses melalui tautan undangan resmi berikut:\n${generatedLink}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.\n\n_Wassalamu'alaikum Warahmatullahi Wabarakatuh_\nKeluarga Besar Faris & Zulaikha`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyWhatsAppText = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setWaCopied(true);
    setTimeout(() => setWaCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handlePreviewAsGuest = () => {
    onSelectGuest(fullNameWithSalutation);
    // Update browser URL without reloading
    const newUrl = `${window.location.pathname}?to=${encodeURIComponent(fullNameWithSalutation)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    onClose();
  };

  const quickGuestPresets = [
    { title: 'Dato\' H. Ahmad & Keluarga', sal: 'Dato\'' },
    { title: 'Bapak Dr. Hendra & Istri', sal: 'Bapak' },
    { title: 'Sahabat Sejawat Teknik', sal: 'Sahabat' },
    { title: 'Keluarga Besar Wan Ibrahim', sal: 'Keluarga Besar' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-link-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0b2b1e] via-[#082016] to-[#05160f] rounded-2xl border border-[#d4af37]/50 shadow-2xl p-6 sm:p-8 text-[#f7f3e8] overflow-hidden max-h-[90vh] overflow-y-auto">
        <SongketCorner position="top-left" />
        <SongketCorner position="top-right" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Tutup jendela pembuat link"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#0e3b2a] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] mb-3 shadow-md">
            <Link2 className="w-6 h-6" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
            Personalisasi Tautan Tamu
          </span>
          <h3 id="guest-link-title" className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
            Atur Tautan Tamu Khusus
          </h3>
          <p className="text-xs text-[#baa995] max-w-sm mx-auto mt-1">
            Buat tautan unik otomatis untuk setiap tamu agar nama mereka tertera anggun di sampul warkah undangan.
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1">
                Sebutan / Gelar
              </label>
              <select
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Bapak/Ibu">Bapak/Ibu</option>
                <option value="Bapak">Bapak</option>
                <option value="Ibu">Ibu</option>
                <option value="Dato'">Dato&apos;</option>
                <option value="Datin">Datin</option>
                <option value="Tengku">Tengku</option>
                <option value="Keluarga Besar">Keluarga Besar</option>
                <option value="Sahabat">Sahabat</option>
                <option value="Saudara/i">Saudara/i</option>
                <option value="">(Tanpa Sebutan)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1">
                Nama Tamu Undangan
              </label>
              <input
                type="text"
                placeholder="Contoh: H. Ahmad Subarkah & Istri"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0e3526] border border-[#d4af37]/30 text-white placeholder-[#87998e] text-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] text-[#baa995] block mb-1">Contoh Cepat:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickGuestPresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSalutation(p.sal);
                    setGuestName(p.title.replace(`${p.sal} `, ''));
                  }}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-[#0e3829] hover:bg-[#144f39] text-[#e8ded0] border border-[#d4af37]/20 transition-colors cursor-pointer"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview of Greeting Card */}
          <div className="p-4 rounded-xl bg-[#0b241a] border border-[#d4af37]/30 text-center">
            <span className="text-[10px] uppercase tracking-widest text-[#d4af37] block mb-1">
              Tampilan Pada Sampul Tamu:
            </span>
            <p className="font-display text-base font-bold text-white break-words">
              {fullNameWithSalutation}
            </p>
          </div>

          {/* Generated URL Box */}
          <div>
            <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1">
              Tautan Undangan Unik
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full px-3 py-2 rounded-xl bg-[#071911] border border-[#d4af37]/30 text-[#e0d6c6] text-xs font-mono select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-[#d4af37] hover:bg-[#c29d2b] text-[#071911] font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2 border-t border-[#d4af37]/20">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim Pesan Melayu via WhatsApp</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyWhatsAppText}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0e3829] hover:bg-[#134e38] text-white border border-[#d4af37]/30 text-xs transition-colors cursor-pointer"
            >
              {waCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
              <span>{waCopied ? 'Teks Tersalin!' : 'Salin Teks Pesan'}</span>
            </button>

            <button
              type="button"
              onClick={handlePreviewAsGuest}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0e3829] hover:bg-[#134e38] text-white border border-[#d4af37]/30 text-xs transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Lihat Sebagai Tamu Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
