import React, { useState, useEffect } from 'react';
import { Clock, CalendarCheck } from 'lucide-react';
import { PucukRebungDivider } from './MalayOrnaments';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDateIso?: string;
  displayDate?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateIso = '2026-10-24T09:00:00+07:00',
  displayDate = 'Sabtu, 24 Oktober 2026',
}) => {
  const targetDate = new Date(targetDateIso).getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="relative max-w-xl mx-auto my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0b281d] to-[#071a13] border border-[#d4af37]/35 shadow-xl text-center">
      <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1">
        <Clock className="w-3.5 h-3.5" />
        <span>Menghitung Hari Bahagia</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#f7f3e8] mb-2">
        Menuju Majlis Ijab &amp; Bersanding
      </h3>

      <p className="text-xs text-[#c5b8a0] max-w-md mx-auto mb-6">
        Dengan memohon rahmat dan berkah Allah SWT, detik demi detik kami nantikan kehadiran sanak saudara sekalian.
      </p>

      {/* 4 Counter Cards */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-5">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-xl bg-[#0e3527]/90 border border-[#d4af37]/25 shadow-inner"
          >
            <span className="font-display text-2xl sm:text-4xl font-extrabold text-gold-gradient tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#d4af37] mt-1 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#e0d6c4]">
        <CalendarCheck className="w-4 h-4 text-[#d4af37]" />
        <span>{displayDate} · Pekanbaru, Riau</span>
      </div>

      <PucukRebungDivider className="mt-4" />
    </div>
  );
};
