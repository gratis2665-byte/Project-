import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Users, CalendarCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { RsvpSubmission, WishMessage } from '../types/wedding';
import { PucukRebungDivider, SongketCorner } from './MalayOrnaments';

interface RsvpSectionProps {
  initialGuestName?: string;
  onNewRsvp?: (rsvp: RsvpSubmission) => void;
  onNewWish?: (wish: WishMessage) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  initialGuestName = '',
  onNewRsvp,
  onNewWish,
}) => {
  const [name, setName] = useState(initialGuestName);
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [pax, setPax] = useState<number>(2);
  const [session, setSession] = useState<'akad' | 'resepsi' | 'semua'>('semua');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedCount, setConfirmedCount] = useState<number>(248);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp: RsvpSubmission = {
      id: `rsvp-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      attendance,
      pax: attendance === 'hadir' ? pax : 0,
      session,
      notes: notes.trim(),
      timestamp: 'Baru saja',
    };

    // If attendance is 'hadir', update confirmed count
    if (attendance === 'hadir') {
      setConfirmedCount((prev) => prev + pax);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#10b981', '#f5e197', '#ffffff'],
      });
    }

    if (onNewRsvp) {
      onNewRsvp(newRsvp);
    }

    // Also forward wish to live wishes feed if notes provided
    if (notes.trim() && onNewWish) {
      onNewWish({
        id: `wish-${Date.now()}`,
        name: name.trim(),
        attendance,
        relation: 'Tamu Undangan',
        message: notes.trim(),
        timestamp: 'Baru saja',
        likes: 1,
        userLiked: false,
      });
    }

    setIsSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-songket-dense/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-2">
            Konfirmasi Kehadiran
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-gold-shimmer mb-3">
            RSVP Walimatul &apos;Ursy
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc2af] max-w-md mx-auto">
            Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan kurnia dan kehormatan yang tiada tara bagi kami sekeluarga.
          </p>
          <PucukRebungDivider className="my-6" />

          {/* Guest Count Tracker Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d3424] border border-[#d4af37]/30 text-xs text-[#f5e197] shadow-sm">
            <Users className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              <strong className="text-white tabular-nums font-mono">{confirmedCount}</strong> Tamu Telah Mengonfirmasi Kehadiran
            </span>
          </div>
        </div>

        {/* RSVP Card Form */}
        <div className="relative bg-gradient-to-b from-[#0b291d] to-[#071912] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-10 shadow-2xl">
          <SongketCorner position="top-left" />
          <SongketCorner position="top-right" />
          <SongketCorner position="bottom-left" />
          <SongketCorner position="bottom-right" />

          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0e3d2c] border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Syukron Katsiran, Terima Kasih!
              </h3>
              <p className="text-sm text-[#ded3c2] max-w-md mx-auto leading-relaxed">
                Konfirmasi kehadiran atas nama <strong className="text-[#f5e197]">{name}</strong> telah berhasil kami catat. Semoga langkah kaki Anda dimudahkan menuju majlis kami.
              </p>

              <div className="p-4 bg-[#0e3527]/70 rounded-xl border border-[#d4af37]/25 text-xs text-[#c5b8a0] max-w-sm mx-auto text-left space-y-1">
                <p>Status: <span className="text-white capitalize">{attendance === 'hadir' ? 'Pasti Hadir' : attendance === 'ragu' ? 'Masih Menyesuaikan' : 'Belum Bisa Hadir'}</span></p>
                {attendance === 'hadir' && (
                  <>
                    <p>Jumlah Pax: <span className="text-white">{pax} Orang</span></p>
                    <p>Sesi: <span className="text-white capitalize">{session === 'semua' ? 'Akad & Resepsi' : session}</span></p>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e3b2a] hover:bg-[#134e38] text-white border border-[#d4af37]/40 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Perbarui Data Konfirmasi</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nama Tamu */}
              <div>
                <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1.5">
                  Nama Lengkap Tamu <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dato' H. Mansur & Datin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e3425] border border-[#d4af37]/30 text-white placeholder-[#87998e] text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1.5">
                  Nomor WhatsApp / HP (Opsional)
                </label>
                <input
                  type="tel"
                  placeholder="0812-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e3425] border border-[#d4af37]/30 text-white placeholder-[#87998e] text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              {/* Konfirmasi Kehadiran (Segmented selection) */}
              <div>
                <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-2">
                  Konfirmasi Kehadiran <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'hadir', label: 'Hadir', desc: 'Insya Allah Hadir' },
                    { id: 'ragu', label: 'Ragu-ragu', desc: 'Menyesuaikan' },
                    { id: 'tidak', label: 'Berhalangan', desc: 'Doa Dari Jauh' },
                  ].map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setAttendance(option.id as 'hadir' | 'tidak' | 'ragu')}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        attendance === option.id
                          ? 'bg-[#d4af37] border-[#d4af37] text-[#071911] font-bold shadow-md'
                          : 'bg-[#0e3425] border-[#d4af37]/25 text-[#cfc2af] hover:text-white'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold">{option.label}</div>
                      <div className="text-[10px] opacity-80">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* If Hadir, specify Pax & Session */}
              {attendance === 'hadir' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Jumlah Pax */}
                  <div>
                    <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1.5">
                      Jumlah Tamu (Pax)
                    </label>
                    <select
                      value={pax}
                      onChange={(e) => setPax(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e3425] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value={1} className="bg-[#0b241a]">1 Orang</option>
                      <option value={2} className="bg-[#0b241a]">2 Orang</option>
                      <option value={3} className="bg-[#0b241a]">3 Orang</option>
                      <option value={4} className="bg-[#0b241a]">4 Orang</option>
                    </select>
                  </div>

                  {/* Sesi Acara */}
                  <div>
                    <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1.5">
                      Sesi Kehadiran
                    </label>
                    <select
                      value={session}
                      onChange={(e) => setSession(e.target.value as 'akad' | 'resepsi' | 'semua')}
                      className="w-full px-4 py-3 rounded-xl bg-[#0e3425] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="semua" className="bg-[#0b241a]">Akad &amp; Resepsi</option>
                      <option value="akad" className="bg-[#0b241a]">Akad Nikah Saja (Pagi)</option>
                      <option value="resepsi" className="bg-[#0b241a]">Resepsi Saja (Siang)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Kolom Doa & Ucapan */}
              <div>
                <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1.5">
                  Doa Restu &amp; Pesan untuk Mempelai
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan bait doa, restu, atau pantun Melayu bagi kedua mempelai..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e3425] border border-[#d4af37]/30 text-white placeholder-[#87998e] text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#aa820a] hover:from-[#c59a35] hover:to-[#be9312] text-[#071911] font-display font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#071911]" />
                <span>Kirim Konfirmasi Kehadiran</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
