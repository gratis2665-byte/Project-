import React, { useState } from 'react';
import {
  MessageSquareHeart,
  Send,
  Heart,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
} from 'lucide-react';
import { WishMessage } from '../types/wedding';
import { PucukRebungDivider, SongketCorner, TepakSirihIcon } from './MalayOrnaments';

const INITIAL_WISHES: WishMessage[] = [
  {
    id: 'wish-1',
    name: 'Dato\' Seri H. Zulkifli & Datin Rohani',
    attendance: 'hadir',
    relation: 'Kerabat Lembaga Adat Melayu',
    message: 'Barakallahu lakuma wa baraka \'alaikuma wa jama\'a bainakuma fii khoir. Tahniah buat Tengku Faris dan Ananda Zulaikha. Semoga bahtera rumah tangga senantiasa dirahmati sakinah, mawaddah, warahmah, berkekalan hingga ke jannah.',
    timestamp: '15 menit yang lalu',
    likes: 24,
    userLiked: false,
  },
  {
    id: 'wish-2',
    name: 'Rian Syahputra, S.T. & Rekan Teknik',
    attendance: 'hadir',
    relation: 'Sahabat Pengantin Pria',
    message: 'Selamat menempuh hidup baru sahabatku Faris! Dari masa kuliah dulu sampai akhirnya bersanding di pelaminan megah ini. Semoga menjadi imam yang amanah dan bahagia selalu bersama Zulaikha!',
    timestamp: '1 jam yang lalu',
    likes: 18,
    userLiked: false,
  },
  {
    id: 'wish-3',
    name: 'Nurul Fathia, S.Farm. & Teman Apoteker',
    attendance: 'hadir',
    relation: 'Sahabat Pengantin Wanita',
    message: 'Masya Allah Tabarakallah Zulaikha sayang! Anggun sekali memakai mahkota sunting emas Melayu. Semoga bahagia dunia akhirat bersama Kak Faris, langgeng sampai kakek nenek aamiin ya rabbal \'alamin.',
    timestamp: '3 jam yang lalu',
    likes: 31,
    userLiked: true,
  },
  {
    id: 'wish-4',
    name: 'Keluarga Besar Wan Ibrahim (Siak Sri Indrapura)',
    attendance: 'hadir',
    relation: 'Keluarga Besar',
    message: 'Bunga melur cempaka sari, perahu berlayar ke Selat Melaka. Selamat melangkah ke gerbang mahligai asmara, senantiasa rukun dan murah rezeki buat kedua ananda.',
    timestamp: '5 jam yang lalu',
    likes: 14,
    userLiked: false,
  },
  {
    id: 'wish-5',
    name: 'Dr. Ilham Ramadhan & Istri',
    attendance: 'ragu',
    relation: 'Rekan Kerja Rumah Sakit',
    message: 'Tahniah Faris dan Zulaikha! Kami usahakan hadir di sesi resepsi siang. Doa terbaik kami haturkan dari jauh semoga Allah limpahkan limpahan kebaikan dan kebahagiaan.',
    timestamp: '8 jam yang lalu',
    likes: 9,
    userLiked: false,
  },
];

interface WishesSectionProps {
  wishes?: WishMessage[];
  onAddWish?: (wish: WishMessage) => void;
  defaultGuestName?: string;
}

export const WishesSection: React.FC<WishesSectionProps> = ({
  wishes = INITIAL_WISHES,
  onAddWish,
  defaultGuestName = '',
}) => {
  const [localWishes, setLocalWishes] = useState<WishMessage[]>(wishes);
  const [authorName, setAuthorName] = useState(defaultGuestName);
  const [relation, setRelation] = useState('Sahabat');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'hadir' | 'popular'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Quick prayer suggestions in Malay tradition
  const quickPrayers = [
    'Barakallahu laka wa baaraka \'alaika wa jama\'a bainakuma fii khoir 🤲',
    'Semoga menjadi keluarga sakinah, mawaddah, warahmah hingga syurga-Nya ✨',
    'Selamat berlayar di bahtera rumah tangga, berkah rezeki & zuriat saleh 🌿',
  ];

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: WishMessage = {
      id: `wish-${Date.now()}`,
      name: authorName.trim(),
      attendance,
      relation,
      message: message.trim(),
      timestamp: 'Baru saja',
      likes: 1,
      userLiked: true,
    };

    setLocalWishes([newWish, ...localWishes]);
    if (onAddWish) {
      onAddWish(newWish);
    }

    setMessage('');
    setIsSubmitting(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  const toggleLike = (wishId: string) => {
    setLocalWishes((prev) =>
      prev.map((item) => {
        if (item.id === wishId) {
          const userLiked = !item.userLiked;
          const likes = userLiked ? item.likes + 1 : item.likes - 1;
          return { ...item, likes, userLiked };
        }
        return item;
      })
    );
  };

  const filteredWishes = localWishes
    .filter((w) => {
      if (filterType === 'hadir') return w.attendance === 'hadir';
      return true;
    })
    .filter((w) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        w.name.toLowerCase().includes(query) ||
        w.message.toLowerCase().includes(query) ||
        w.relation.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (filterType === 'popular') return b.likes - a.likes;
      return 0;
    });

  return (
    <section id="doa-ucapan" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-2">
            Buku Tamu Virtual
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-gold-shimmer mb-3">
            Kesan, Pesan &amp; Doa Restu
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc2af] max-w-lg mx-auto">
            Untaian bait doa dan ketulusan hati dari segenap keluarga, sahabat, serta handai tolan menjadi penerang langkah kedua mempelai.
          </p>
          <PucukRebungDivider className="my-6" />
        </div>

        {/* Input Card Form */}
        <div className="relative bg-gradient-to-b from-[#0b2b1e] to-[#071a13] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl mb-12">
          <SongketCorner position="top-left" />
          <SongketCorner position="top-right" />

          <div className="flex items-center gap-2 mb-4 text-[#d4af37]">
            <MessageSquareHeart className="w-5 h-5" />
            <h3 className="font-display font-semibold text-base sm:text-lg text-white">
              Tuliskan Doa &amp; Pesan Anda
            </h3>
          </div>

          <form onSubmit={handlePostWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1">
                  Nama Anda <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap / Panggilan"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e3526] border border-[#d4af37]/30 text-white placeholder-[#87998e] text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1">
                  Hubungan / Kerabat
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e3526] border border-[#d4af37]/30 text-white text-sm focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Sahabat Pengantin Pria">Sahabat Pengantin Pria</option>
                  <option value="Sahabat Pengantin Wanita">Sahabat Pengantin Wanita</option>
                  <option value="Keluarga Besar">Keluarga Besar</option>
                  <option value="Rekan Kerja / Profesi">Rekan Kerja / Profesi</option>
                  <option value="Teman Sekolah / Kuliah">Teman Sekolah / Kuliah</option>
                  <option value="Tamu Undangan">Tamu Undangan Terhormat</option>
                </select>
              </div>
            </div>

            {/* Attendance selection */}
            <div>
              <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1.5">
                Konfirmasi Kehadiran Anda
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'hadir', label: 'Insya Allah Hadir' },
                  { id: 'ragu', label: 'Ragu-ragu' },
                  { id: 'tidak', label: 'Belum Bisa Hadir' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setAttendance(opt.id as 'hadir' | 'tidak' | 'ragu')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                      attendance === opt.id
                        ? 'bg-[#d4af37] text-[#071911] border-[#d4af37] font-semibold'
                        : 'bg-[#0e3526] text-[#bcaea0] border-[#d4af37]/20 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Doa / Pesan Area */}
            <div>
              <label className="block text-xs font-semibold text-[#f5ebd9] uppercase tracking-wider mb-1">
                Untaian Doa &amp; Kesan Pesan <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Tuliskan ucapan selamat, doa barakah, atau pantun Melayu bagi kedua mempelai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0e3526] border border-[#d4af37]/30 text-white placeholder-[#87998e] text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Quick Prayer Template Chips */}
            <div>
              <span className="text-[11px] text-[#baa995] block mb-1.5">Pilihan Doa Cepat:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrayers.map((prayer, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setMessage((prev) => (prev ? `${prev} ${prayer}` : prayer))}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0e3829] hover:bg-[#134e38] text-[#e8dfcf] border border-[#d4af37]/25 transition-colors text-left cursor-pointer"
                  >
                    + {prayer.slice(0, 36)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#aa820a] hover:from-[#c59a35] hover:to-[#be9312] text-[#071911] font-display font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#071911]" />
                <span>Kirimkan Doa &amp; Ucapan</span>
              </button>

              {showSuccessToast && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Doa Anda telah diterbitkan di buku tamu!</span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Wishes Feed Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#a3b8aa] uppercase tracking-wider font-semibold">
              Filter:
            </span>
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'hadir', label: 'Tamu Hadir' },
                { id: 'popular', label: 'Terpopuler' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as 'all' | 'hadir' | 'popular')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterType === f.id
                      ? 'bg-[#d4af37] text-[#071911] font-semibold'
                      : 'bg-[#0b271d] text-[#cfc2af] hover:text-white border border-[#d4af37]/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#9fb8a9] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ucapan atau nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0a241a] border border-[#d4af37]/25 text-xs text-white placeholder-[#87998e] focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Live Wishes Feed List */}
        <div className="space-y-4">
          {filteredWishes.length === 0 ? (
            <div className="p-8 text-center bg-[#092217] rounded-xl border border-[#d4af37]/20 text-xs text-[#b8ab97]">
              Belum ada ucapan yang cocok dengan pencarian Anda. Jadilah yang pertama mengirimkan ucapan!
            </div>
          ) : (
            filteredWishes.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#092318]/90 border border-[#d4af37]/25 shadow-md hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0e3b2a] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-display font-bold text-sm shrink-0 shadow-inner">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#f5ebd9] leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#a3b8aa] mt-0.5">
                        <span>{item.relation}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[#8fa89b]">
                          <Clock className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance badge */}
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                      item.attendance === 'hadir'
                        ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                        : item.attendance === 'ragu'
                        ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                        : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
                    }`}
                  >
                    {item.attendance === 'hadir'
                      ? '✓ Hadir'
                      : item.attendance === 'ragu'
                      ? '? Menyesuaikan'
                      : '✕ Berhalangan'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#ded3c2] leading-relaxed my-3 pl-1 sm:pl-13">
                  {item.message}
                </p>

                {/* Like / Aamiin Button */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#d4af37]/15">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                      item.userLiked
                        ? 'bg-[#d4af37]/20 text-[#f5e197] border border-[#d4af37]/40 font-semibold'
                        : 'bg-[#0d2f21] text-[#bcaea0] hover:text-white border border-[#d4af37]/20'
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        item.userLiked ? 'fill-[#d4af37] text-[#d4af37]' : 'text-[#bcaea0]'
                      }`}
                    />
                    <span>{item.userLiked ? 'Aamiin' : 'Kirim Aamiin'}</span>
                    <span className="font-mono text-[11px] text-[#f5e197] tabular-nums">
                      ({item.likes})
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
