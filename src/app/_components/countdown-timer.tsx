
"use client";

import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  onFinished: () => void;
}

const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

const TimerBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="text-5xl md:text-7xl font-mono font-extrabold text-white"
      style={{
        textShadow:
          '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)',
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
      {label}
    </div>
  </div>
);

export function CountdownTimer({ targetDate, onFinished }: CountdownTimerProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initial calculation
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onFinished]);
    
    return (
        <div 
            className="relative w-screen h-screen text-white overflow-hidden"
            style={{ background: `url('/zavertv.png') center center / cover no-repeat` }}
        >
            <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: '260px' }}>
                 {isClient && timeLeft && (
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg pb-8 pt-7 px-8 inline-flex items-start justify-center gap-x-6 md:gap-x-10">
                        <TimerBox value={timeLeft.days} label={t('countdown_days')} />
                        <TimerBox value={timeLeft.hours} label={t('countdown_hours')} />
                        <TimerBox value={timeLeft.minutes} label={t('countdown_minutes')} />
                        <TimerBox value={timeLeft.seconds} label={t('countdown_seconds')} />
                    </div>
                )}
            </div>
        </div>
    );
};
