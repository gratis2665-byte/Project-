import React, { useState } from 'react';
import {
  Settings,
  Lock,
  Unlock,
  X,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  User,
  Calendar,
  MapPin,
  CreditCard,
  Sparkles,
  Link2,
  Check,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';
import { PucukRebungDivider, SongketCorner } from './MalayOrnaments';

interface AdminSecretDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSaveConfig: (newConfig: WeddingConfig) => void;
  onResetConfig: () => void;
}

export const AdminSecretDrawer: React.FC<AdminSecretDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'mempelai' | 'acara' | 'hadiah' | 'tampilan' | 'tamu'>('mempelai');
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Quick Guest Link Generator inside Admin
  const [adminGuestName, setAdminGuestName] = useState('');
  const [adminGuestSalutation, setAdminGuestSalutation] = useState('Bapak/Ibu');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === '') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSave = () => {
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Kembalikan semua pengaturan ke setelan awal warkah?')) {
      onResetConfig();
      setFormData(DEFAULT_WEDDING_CONFIG);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  // Admin Quick Link computation
  const baseUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const guestFormatted = adminGuestName.trim()
    ? `${adminGuestSalutation ? adminGuestSalutation + ' ' : ''}${adminGuestName.trim()}`
    : 'Bapak/Ibu Tamu Terhormat';
  const fullAdminGuestUrl = `${baseUrl}?to=${encodeURIComponent(guestFormatted)}`;

  const handleCopyAdminGuestLink = () => {
    navigator.clipboard.writeText(fullAdminGuestUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenWhatsAppAdmin = () => {
    const text = `*Warkah Jemputan Walimatul 'Ursy Adat Melayu*\n\nKepada Yth. *${guestFormatted}*,\n\nKami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami:\n*${formData.groomName} & ${formData.brideName}*\n🗓 ${formData.weddingDateDisplay}\n📍 ${formData.venueName}\n\nTautan Undangan Resmi:\n${fullAdminGuestUrl}\n\nTerima kasih.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0b281d] via-[#081e15] to-[#05140e] rounded-2xl border border-[#d4af37]/60 shadow-2xl text-[#f7f3e8] overflow-hidden flex flex-col max-h-[92vh]">
        <SongketCorner position="top-left" />
        <SongketCorner position="top-right" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#d4af37]/25 flex items-center justify-between bg-[#0e3526]/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-lg text-[#d4af37]">
              <Settings className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block">
                Fitur Rahasia Pengantin
              </span>
              <h3 id="admin-panel-title" className="text-base sm:text-lg font-display font-bold text-white">
                Kelola Seluruh Tampilan Web
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Tutup Panel Pengantin"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lock Screen if Not Unlocked */}
        {!isUnlocked ? (
          <div className="p-8 sm:p-12 text-center max-w-sm mx-auto my-auto space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#0e3a29] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <h4 className="font-display font-bold text-lg text-white">
              Kunci Akses Kelola Web
            </h4>
            <p className="text-xs text-[#baa995] leading-relaxed">
              Panel ini memungkinkan Anda mengubah data kedua mempelai, jadwal acara, rekening, dan tampilan web secara mandiri.
            </p>

            <form onSubmit={handleUnlock} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={8}
                placeholder="Masukkan PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest px-4 py-2.5 rounded-xl bg-[#0e3425] border border-[#d4af37]/40 text-white placeholder-[#7d8f84] text-sm focus:outline-none focus:border-[#d4af37]"
              />

              {pinError && (
                <p className="text-xs text-rose-400">
                  PIN salah. Gunakan PIN default <strong>1234</strong> atau kosongkan lalu klik buka.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#aa820a] hover:from-[#c59a35] text-[#071911] font-display font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Buka Panel Pengaturan</span>
              </button>

              <button
                type="button"
                onClick={() => setIsUnlocked(true)}
                className="text-[11px] text-[#a3b8aa] hover:text-[#d4af37] underline cursor-pointer"
              >
                Akses Langsung Tanpa PIN
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex border-b border-[#d4af37]/20 bg-[#092218] px-2 sm:px-4 overflow-x-auto no-scrollbar gap-1 text-xs">
              {[
                { id: 'mempelai', label: 'Mempelai', icon: User },
                { id: 'acara', label: 'Waktu & Tempat', icon: Calendar },
                { id: 'hadiah', label: 'Rekening Kado', icon: CreditCard },
                { id: 'tampilan', label: 'Tampilan Web', icon: Eye },
                { id: 'tamu', label: 'Link Tamu', icon: Link2 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-1.5 py-3 px-3 border-b-2 font-medium transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[#d4af37] text-[#f5e197] bg-[#0e3a29]/50'
                        : 'border-transparent text-[#bcaea0] hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Form Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* TAB 1: MEMPELAI */}
              {activeTab === 'mempelai' && (
                <div className="space-y-4">
                  <div className="p-3 bg-[#0d3424]/60 rounded-xl border border-[#d4af37]/25 text-xs text-[#cfc2af]">
                    Ubah nama dan silsilah keluarga kedua mempelai yang tampil di warkah undangan.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Groom */}
                    <div className="p-4 rounded-xl bg-[#092419] border border-[#d4af37]/25 space-y-3">
                      <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                        Pengantin Pria (Raja Sehari)
                      </h4>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Nama Panggilan</label>
                        <input
                          type="text"
                          value={formData.groomName}
                          onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Nama Lengkap &amp; Gelar</label>
                        <input
                          type="text"
                          value={formData.groomFullName}
                          onChange={(e) => setFormData({ ...formData, groomFullName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Gelar Adat Melayu</label>
                        <input
                          type="text"
                          value={formData.groomTitle}
                          onChange={(e) => setFormData({ ...formData, groomTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Nama Orang Tua</label>
                        <input
                          type="text"
                          value={formData.groomParents}
                          onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                    </div>

                    {/* Bride */}
                    <div className="p-4 rounded-xl bg-[#092419] border border-[#d4af37]/25 space-y-3">
                      <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                        Pengantin Wanita (Ratu Sehari)
                      </h4>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Nama Panggilan</label>
                        <input
                          type="text"
                          value={formData.brideName}
                          onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Nama Lengkap &amp; Gelar</label>
                        <input
                          type="text"
                          value={formData.brideFullName}
                          onChange={(e) => setFormData({ ...formData, brideFullName: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Gelar Adat Melayu</label>
                        <input
                          type="text"
                          value={formData.brideTitle}
                          onChange={(e) => setFormData({ ...formData, brideTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#baa995] block mb-1">Nama Orang Tua</label>
                        <input
                          type="text"
                          value={formData.brideParents}
                          onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: WAKTU & TEMPAT */}
              {activeTab === 'acara' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#baa995] block mb-1">Tanggal Acara (Teks Tampilan)</label>
                      <input
                        type="text"
                        value={formData.weddingDateDisplay}
                        onChange={(e) => setFormData({ ...formData, weddingDateDisplay: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#baa995] block mb-1">Nama Gedung / Balai Adat</label>
                      <input
                        type="text"
                        value={formData.venueName}
                        onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#baa995] block mb-1">Alamat Lengkap Acara</label>
                    <textarea
                      rows={2}
                      value={formData.venueAddress}
                      onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#baa995] block mb-1">Waktu Akad Nikah</label>
                      <input
                        type="text"
                        value={formData.akadTime}
                        onChange={(e) => setFormData({ ...formData, akadTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#baa995] block mb-1">Waktu Resepsi (Bersanding)</label>
                      <input
                        type="text"
                        value={formData.resepsiTime}
                        onChange={(e) => setFormData({ ...formData, resepsiTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: REKENING HADIAH */}
              {activeTab === 'hadiah' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#092419] rounded-xl border border-[#d4af37]/25 space-y-2">
                      <span className="text-xs text-[#d4af37] font-semibold block">Bank BSI Syariah</span>
                      <input
                        type="text"
                        placeholder="Nomor Rekening"
                        value={formData.bankBsiAccount}
                        onChange={(e) => setFormData({ ...formData, bankBsiAccount: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Atas Nama"
                        value={formData.bankBsiHolder}
                        onChange={(e) => setFormData({ ...formData, bankBsiHolder: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>

                    <div className="p-3 bg-[#092419] rounded-xl border border-[#d4af37]/25 space-y-2">
                      <span className="text-xs text-[#d4af37] font-semibold block">Bank BCA</span>
                      <input
                        type="text"
                        placeholder="Nomor Rekening"
                        value={formData.bankBcaAccount}
                        onChange={(e) => setFormData({ ...formData, bankBcaAccount: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Atas Nama"
                        value={formData.bankBcaHolder}
                        onChange={(e) => setFormData({ ...formData, bankBcaHolder: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>

                    <div className="p-3 bg-[#092419] rounded-xl border border-[#d4af37]/25 space-y-2">
                      <span className="text-xs text-[#d4af37] font-semibold block">Bank Mandiri</span>
                      <input
                        type="text"
                        placeholder="Nomor Rekening"
                        value={formData.bankMandiriAccount}
                        onChange={(e) => setFormData({ ...formData, bankMandiriAccount: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Atas Nama"
                        value={formData.bankMandiriHolder}
                        onChange={(e) => setFormData({ ...formData, bankMandiriHolder: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#baa995] block mb-1">Alamat Penerima Kado Fisik</label>
                    <textarea
                      rows={2}
                      value={formData.giftAddress}
                      onChange={(e) => setFormData({ ...formData, giftAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: VISIBILITAS TAMPILAN WEB */}
              {activeTab === 'tampilan' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#0d3424]/60 rounded-xl border border-[#d4af37]/25 text-xs text-[#cfc2af]">
                    Pilih bagian mana saja yang ingin ditampilkan atau disembunyikan dari pengunjung web:
                  </div>

                  {[
                    { key: 'showCountdown', label: 'Hitung Mundur Acara (Countdown Timer)', desc: 'Menampilkan hitungan hari, jam, menit' },
                    { key: 'showCouple', label: 'Profil Raja & Ratu Sehari', desc: 'Kartu pengantin pria & wanita beserta silsilah' },
                    { key: 'showSchedule', label: 'Jadwal Acara & Peta Lokasi', desc: 'Waktu akad, resepsi, dress code, dan Google Maps' },
                    { key: 'showGallery', label: 'Galeri Foto Interaktif', desc: 'Grid foto & lightbox pembesar momen' },
                    { key: 'showWishes', label: 'Buku Tamu (Kesan, Pesan & Doa)', desc: 'Kolom ucapan langsung di halaman utama' },
                    { key: 'showGifts', label: 'Tanda Kasih & Hadiah Digital', desc: 'Nomor rekening bank & alamat kado' },
                    { key: 'showMalayAnimation', label: 'Animasi Nuansa Melayu', desc: 'Kelopak bunga melati & kilau emas berjatuhan lembut' },
                  ].map((item) => {
                    const isChecked = formData[item.key as keyof WeddingConfig] as boolean;
                    return (
                      <div
                        key={item.key}
                        onClick={() =>
                          setFormData({ ...formData, [item.key]: !isChecked })
                        }
                        className="flex items-center justify-between p-3 rounded-xl bg-[#0a261a] border border-[#d4af37]/25 hover:border-[#d4af37]/50 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="text-xs font-semibold text-white">{item.label}</p>
                          <p className="text-[11px] text-[#9fb8a9]">{item.desc}</p>
                        </div>
                        <div
                          className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${
                            isChecked ? 'bg-[#d4af37]' : 'bg-[#1b3d2f]'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-[#071911] shadow transform transition-transform ${
                              isChecked ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 5: LINK TAMU */}
              {activeTab === 'tamu' && (
                <div className="space-y-4">
                  <div className="p-3 bg-[#0d3424]/60 rounded-xl border border-[#d4af37]/25 text-xs text-[#cfc2af]">
                    Buat dan bagikan tautan warkah undangan untuk setiap tamu undangan kehormatan:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-[#baa995] block mb-1">Sebutan Tamu</label>
                      <select
                        value={adminGuestSalutation}
                        onChange={(e) => setAdminGuestSalutation(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      >
                        <option value="Bapak/Ibu">Bapak/Ibu</option>
                        <option value="Dato'">Dato&apos;</option>
                        <option value="Datin">Datin</option>
                        <option value="Tengku">Tengku</option>
                        <option value="Keluarga Besar">Keluarga Besar</option>
                        <option value="Sahabat">Sahabat</option>
                        <option value="">Tanpa Sebutan</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-[#baa995] block mb-1">Nama Tamu</label>
                      <input
                        type="text"
                        placeholder="Contoh: H. Ahmad Subarkah & Istri"
                        value={adminGuestName}
                        onChange={(e) => setAdminGuestName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0e3526] border border-[#d4af37]/30 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#baa995] block mb-1">Tautan Tamu Khusus:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={fullAdminGuestUrl}
                        className="w-full px-3 py-2 rounded-lg bg-[#071a12] border border-[#d4af37]/30 text-[#f5ebd9] text-xs font-mono select-all"
                      />
                      <button
                        onClick={handleCopyAdminGuestLink}
                        className="px-3 py-2 rounded-lg bg-[#d4af37] text-[#071911] text-xs font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenWhatsAppAdmin}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Langsung Undangan via WhatsApp</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer Action Buttons */}
            <div className="p-4 border-t border-[#d4af37]/20 bg-[#071a12] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 rounded-xl bg-[#0d2a1d] hover:bg-[#123927] text-[#cfc2af] hover:text-white border border-[#d4af37]/25 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Setel Ulang Default</span>
                <span className="sm:hidden">Reset</span>
              </button>

              <div className="flex items-center gap-2">
                {savedSuccess && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 animate-fadeIn">
                    <Check className="w-3.5 h-3.5" />
                    <span>Pengaturan Tersimpan!</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#b38728] via-[#d4af37] to-[#aa820a] hover:from-[#c59a35] text-[#071911] font-display font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
