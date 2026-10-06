import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { malayAudioEngine } from '../utils/audioPlayer';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(malayAudioEngine.getIsPlaying());
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = malayAudioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    malayAudioEngine.toggle();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      malayAudioEngine.setVolumeLevel(0.65);
      setIsMuted(false);
    } else {
      malayAudioEngine.setVolumeLevel(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 select-none">
      <button
        onClick={handleTogglePlay}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-xl backdrop-blur-md transition-all cursor-pointer ${
          isPlaying
            ? 'bg-[#0d3425]/90 border-[#d4af37] text-[#f5ebd9] shadow-[#d4af37]/20 hover:bg-[#124532]'
            : 'bg-[#081f16]/90 border-[#d4af37]/40 text-[#baa995] hover:text-white hover:border-[#d4af37]'
        }`}
        title={isPlaying ? 'Jeda Musik Tradisional Melayu' : 'Putar Musik Tradisional Melayu'}
        aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {isPlaying ? (
          <>
            {/* Equalizer Waveform Animation */}
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-1 bg-[#d4af37] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-1 bg-[#f5e197] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-3.5" />
              <span className="w-1 bg-[#d4af37] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
            </div>
            <span className="text-[11px] font-medium tracking-wide text-[#f5e197] hidden sm:inline">
              Musik Melayu
            </span>
            <Pause className="w-3.5 h-3.5 text-[#d4af37]" />
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            <span className="text-[11px] font-medium tracking-wide hidden sm:inline">
              Putar Musik
            </span>
          </>
        )}

        {/* Quick Mute Toggle Button */}
        {isPlaying && (
          <span
            onClick={handleToggleMute}
            className="p-0.5 hover:text-[#d4af37] transition-colors ml-0.5"
            title={isMuted ? 'Nyalakan Suara' : 'Senyap'}
          >
            {isMuted ? (
              <VolumeX className="w-3 h-3 text-rose-400" />
            ) : (
              <Volume2 className="w-3 h-3 text-[#d4af37]" />
            )}
          </span>
        )}
      </button>
    </div>
  );
};
