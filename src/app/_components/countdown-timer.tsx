"use client";

import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  onFinished: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
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

const TimeSlot = ({ value, label, isSeconds }: { value: number; label: string; isSeconds?: boolean }) => (
    <div className="flex flex-col items-center justify-center">
        <div className={cn(
            "text-6xl sm:text-8xl font-bold font-mono tracking-tighter",
            isSeconds ? "text-destructive" : "text-white"
        )}>
            {String(value).padStart(2, '0')}
        </div>
        <div className="text-sm sm:text-base uppercase tracking-widest text-white/70 mt-1">{label}</div>
    </div>
);

export function CountdownTimer({ targetDate, onFinished }: CountdownTimerProps) {
    const { t } = useLanguage();
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft(targetDate);
            if (newTimeLeft) {
                setTimeLeft(newTimeLeft);
            } else {
                clearInterval(timer);
                onFinished();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onFinished]);
    
    return (
        <div 
            className="relative w-screen h-screen text-white overflow-hidden"
            style={{ background: `url('/images/zavertv.png') center center / cover no-repeat fixed` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-12 md:pb-16">
                 {timeLeft ? (
                    <div className="bg-black/80 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm flex items-stretch justify-center gap-x-4 sm:gap-x-8 p-4 sm:p-6">
                        <TimeSlot value={timeLeft.days} label={t('countdown_days')} />
                        <TimeSlot value={timeLeft.hours} label={t('countdown_hours')} />
                        <TimeSlot value={timeLeft.minutes} label={t('countdown_minutes')} />
                        <TimeSlot value={timeLeft.seconds} label={t('countdown_seconds')} isSeconds />
                    </div>
                ) : (
                    <div className="text-center text-4xl font-bold text-primary animate-pulse">
                       {t('countdown_finished')}
                    </div>
                )}
            </div>
        </div>
    );
};
