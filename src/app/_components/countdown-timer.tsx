
"use client";

import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { useEffect, useState }
from 'react';

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

const TimerBox = ({ value, label, isRed }: { value: number; label: string, isRed?: boolean }) => (
  <div className="flex flex-col items-center">
    <div
      className={cn(
        "text-5xl md:text-7xl font-mono font-extrabold",
        isRed ? "text-red-500" : "text-white"
        )}
      style={{
        textShadow: isRed
          ? '0 0 5px rgba(255, 0, 0, 0.5), 0 0 10px rgba(255, 0, 0, 0.5)'
          : '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)',
      }}
    >
      {String(value).padStart(2, '0')}
    </div>
    <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-gray-400">
      {label}
    </div>
  </div>
);

const Colon = () => (
    <div 
        className="text-5xl md:text-7xl font-mono font-extrabold text-white self-center pb-8"
        style={{
             textShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5)'
        }}
    >:</div>
);

export function CountdownTimer({ targetDate, onFinished }: CountdownTimerProps) {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      if (newTimeLeft) {
          setTimeLeft(newTimeLeft);
      } else {
          clearInterval(timer);
          setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
    
    return (
        <div 
            className="relative w-screen h-screen text-white overflow-hidden"
            style={{ background: `url('/zavertv.png') center center / cover no-repeat` }}
        >
            <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: '260px' }}>
                 {isClient && (
                    <div className="bg-black pb-8 pt-7 px-8 inline-flex items-start justify-center gap-x-3 md:gap-x-4">
                        {timeLeft ? (
                            <>
                                <TimerBox value={timeLeft.days} label={t('countdown_days')} />
                                <Colon />
                                <TimerBox value={timeLeft.hours} label={t('countdown_hours')} />
                                <Colon />
                                <TimerBox value={timeLeft.minutes} label={t('countdown_minutes')} />
                                <Colon />
                                <TimerBox value={timeLeft.seconds} label={t('countdown_seconds')} isRed />
                            </>
                        ) : (
                            <div className="h-[125px] w-[550px] rounded-md"></div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
