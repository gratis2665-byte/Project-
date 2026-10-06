/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroCoverModal } from './components/HeroCoverModal';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { CoupleSection } from './components/CoupleSection';
import { EventScheduleSection } from './components/EventScheduleSection';
import { GallerySection } from './components/GallerySection';
import { WishesSection } from './components/WishesSection';
import { GiftEnvelopeSection } from './components/GiftEnvelopeSection';
import { Footer } from './components/Footer';
import { GuestLinkGeneratorModal } from './components/GuestLinkGeneratorModal';
import { MusicController } from './components/MusicController';
import { MalayAmbientAnimation } from './components/MalayAmbientAnimation';
import { AdminSecretDrawer } from './components/AdminSecretDrawer';
import { WishMessage, WeddingConfig, DEFAULT_WEDDING_CONFIG } from './types/wedding';

export default function App() {
  const [guestName, setGuestName] = useState<string>('');
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(true);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [extraWishes, setExtraWishes] = useState<WishMessage[]>([]);

  // Config state initialized from localStorage or defaults
  const [config, setConfig] = useState<WeddingConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('wedding_custom_config');
        if (saved) {
          return { ...DEFAULT_WEDDING_CONFIG, ...JSON.parse(saved) };
        }
      } catch {
        // fallback
      }
    }
    return DEFAULT_WEDDING_CONFIG;
  });

  // Parse personalized guest name & secret admin param from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guestParam = params.get('to') || params.get('tamu') || params.get('name') || params.get('u');
      if (guestParam) {
        setGuestName(decodeURIComponent(guestParam));
      } else {
        setGuestName('Bapak/Ibu/Saudara/i');
      }

      // Secret parameter to directly open management drawer (?admin=1 or ?kelola=1)
      if (params.get('admin') === '1' || params.get('kelola') === '1') {
        setIsAdminOpen(true);
      }
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
  };

  const handleReopenCover = () => {
    setIsCoverOpen(true);
  };

  const handleAddNewWish = (wish: WishMessage) => {
    setExtraWishes((prev) => [wish, ...prev]);
  };

  const handleSelectCustomGuest = (name: string) => {
    setGuestName(name);
  };

  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('wedding_custom_config', JSON.stringify(newConfig));
    } catch {
      // fallback
    }
  };

  const handleResetConfig = () => {
    setConfig(DEFAULT_WEDDING_CONFIG);
    try {
      localStorage.removeItem('wedding_custom_config');
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#081611] text-[#f7f3e8] selection:bg-[#d4af37]/30 selection:text-[#fff8db] relative">
      {/* 1. Animasi Nuansa Melayu (Guguran Kelopak Melati & Kilau Emas Songket) */}
      <MalayAmbientAnimation enabled={config.showMalayAnimation} />

      {/* 2. Tombol Musik Tradisional Melayu yang Elegan */}
      <MusicController />

      {/* 3. Royal Envelope Cover Modal with Personalized Guest Name */}
      <HeroCoverModal
        guestName={guestName}
        isOpen={isCoverOpen}
        onOpenInvitation={handleOpenInvitation}
        config={config}
      />

      <main className={!isCoverOpen ? "animate-malay-entrance" : ""}>
        {/* 4. Hero Section Announcement */}
        <HeroSection
          guestName={guestName}
          config={config}
        />

        {/* 5. Aesthetic Countdown Timer (Configurable) */}
        {config.showCountdown && (
          <CountdownTimer
            targetDateIso={config.weddingDateIso}
            displayDate={config.weddingDateDisplay}
          />
        )}

        {/* 6. Raja & Ratu Sehari Couple Section (Configurable) */}
        {config.showCouple && (
          <CoupleSection config={config} />
        )}

        {/* 7. Event Schedule & Interactive Map (Configurable) */}
        {config.showSchedule && (
          <EventScheduleSection config={config} />
        )}

        {/* 8. Interactive Photo Gallery (Configurable) */}
        {config.showGallery && (
          <GallerySection />
        )}

        {/* 9. Live Guest Wishes & Prayers Feed (Configurable) */}
        {config.showWishes && (
          <WishesSection
            defaultGuestName={guestName !== 'Bapak/Ibu/Saudara/i' ? guestName : ''}
            onAddWish={handleAddNewWish}
          />
        )}

        {/* 10. Digital Gift & Envelope Section (Configurable) */}
        {config.showGifts && (
          <GiftEnvelopeSection config={config} />
        )}
      </main>

      {/* 11. Footer with Secret Admin Trigger */}
      <Footer
        onOpenGuestModal={() => setIsGuestModalOpen(true)}
        onReopenCover={handleReopenCover}
        onOpenAdmin={() => setIsAdminOpen(true)}
        config={config}
      />

      {/* 12. Personalized Guest Link Generator Modal */}
      <GuestLinkGeneratorModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onSelectGuest={handleSelectCustomGuest}
      />

      {/* 13. Fitur Sembunyi untuk Atur Semua Web (Admin Management Drawer) */}
      <AdminSecretDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
