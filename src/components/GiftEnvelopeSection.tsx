import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard } from 'lucide-react';
import { PucukRebungDivider, SongketCorner } from './MalayOrnaments';
import { WeddingConfig, DEFAULT_WEDDING_CONFIG } from '../types/wedding';

interface GiftEnvelopeSectionProps {
  config?: WeddingConfig;
}

export const GiftEnvelopeSection: React.FC<GiftEnvelopeSectionProps> = ({ config = DEFAULT_WEDDING_CONFIG }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const bankAccounts = [
    {
      bank: 'Bank Syariah Indonesia (BSI)',
      accountNumber: config.bankBsiAccount,
      holder: config.bankBsiHolder,
      color: 'from-[#0e4431] to-[#082b1f]',
    },
    {
      bank: 'Bank Central Asia (BCA)',
      accountNumber: config.bankBcaAccount,
      holder: config.bankBcaHolder,
      color: 'from-[#0a3547] to-[#072431]',
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: config.bankMandiriAccount,
      holder: config.bankMandiriHolder,
      color: 'from-[#093539] to-[#062426]',
    },
  ];

  const giftAddress = config.giftAddress;

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(acc);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(giftAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="tanda-kasih" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold block mb-2">
            Tanda Kasih
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-gold-shimmer mb-3">
            Amplop Digital &amp; Bingkisan
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc2af] max-w-lg mx-auto">
            Doa restu Anda adalah kurnia terindah bagi kami. Namun apabila bermaksud memberi tanda kasih dalam bentuk bingkisan atau amplop digital, kami sediakan saluran di bawah ini.
          </p>
          <PucukRebungDivider className="my-6" />
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {bankAccounts.map((account) => (
            <div
              key={account.accountNumber}
              className={`relative rounded-2xl bg-gradient-to-br ${account.color} border border-[#d4af37]/35 p-6 shadow-xl flex flex-col justify-between`}
            >
              <SongketCorner position="top-right" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <CreditCard className="w-6 h-6 text-[#d4af37]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold">
                    Transfer Bank
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-white mb-2">
                  {account.bank}
                </h4>
                <p className="font-mono text-lg text-white font-semibold tracking-wider my-2 select-all">
                  {account.accountNumber}
                </p>
                <p className="text-xs text-[#ded3c2]">
                  a.n <span className="font-semibold text-white">{account.holder}</span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#d4af37]/20">
                <button
                  type="button"
                  onClick={() => handleCopyAccount(account.accountNumber)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#0e3b2a] hover:bg-[#134e38] text-white border border-[#d4af37]/40 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copiedAccount === account.accountNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Nomor Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Salin No. Rekening</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Physical Gift Delivery Address */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#0b291d] to-[#071912] border border-[#d4af37]/30 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-[#0e3c2b] rounded-xl border border-[#d4af37]/40 text-[#d4af37] shrink-0 mt-0.5">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-white mb-1">
                  Kirim Kado / Bingkisan Fisik
                </h4>
                <p className="text-xs text-[#ded3c2] leading-relaxed max-w-xl">
                  {giftAddress}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#0e3b2a] hover:bg-[#134e38] text-white border border-[#d4af37]/40 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
