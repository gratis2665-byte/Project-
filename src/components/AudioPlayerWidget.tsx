import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { malayAudioEngine } from '../utils/audioPlayer';

export const AudioPlayerWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(malayAudioEngine.getIsPlaying());
  const [isMuted, setIsMuted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const unsubscribe = malayAudioEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    malayAudioEngine.toggle();
  };

  const handleToggleMute = () => {
    if (isMuted) {
      malayAudioEngine.setVolumeLevel(0.65);
      setIsMuted(false);
    } else {
      malayAudioEngine.setVolumeLevel(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {/* Track info tooltip on hover or click */}
      {showDetails && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#082217]/95 border border-[#d4af37]/40 shadow-xl text-xs text-[#f5ebd9] backdrop-blur-md animate-fadeIn">
          <Music className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-medium">Langgam Gambus &amp; Serunai Diraja</span>
          <button
            onClick={handleToggleMute}
            className="p-1 rounded-full hover:bg-white/10 text-[#d4af37] cursor-pointer"
            title={isMuted ? 'Nyalakan Suara' : 'Senyap'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Main Circular Button with Rotating Rebana / Disc */}
      <button
        onClick={handleTogglePlay}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        className="relative group p-3 rounded-full bg-gradient-to-tr from-[#092b1d] to-[#124d35] border-2 border-[#d4af37] text-[#d4af37] shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
        aria-label={isPlaying ? 'Hentikan Musik Tradisional' : 'Putar Musik Tradisional'}
      >
        {/* Equalizer animation ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-[#d4af37]/50 animate-ping pointer-events-none" />
        )}

        {/* Rotating Disc Icon */}
        <div className={`transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
          <Disc className="w-5 h-5 text-[#d4af37]" />
        </div>

        {/* Center Play/Pause indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white fill-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          )}
        </div>
      </button>
    </div>
  );
};
