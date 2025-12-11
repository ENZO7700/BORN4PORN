
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

const TimeSlot = ({ value, isSeconds }: { value: number; isSeconds?: boolean }) => (
    <div className={cn(
        "text-7xl font-bold font-mono tracking-widest",
        isSeconds ? "text-red-500" : "text-white"
    )}>
        {String(value).padStart(2, '0')}
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
            style={{ background: `url('/zavertv.png') center center / cover no-repeat` }}
        >
            <div className="absolute left-0 right-0" style={{ bottom: '250px' }}>
                 {timeLeft ? (
                    <div className="flex justify-center">
                        <div className="bg-black rounded-lg p-4 inline-flex items-stretch justify-center gap-x-4">
                            <TimeSlot value={timeLeft.days} />
                            <TimeSlot value={timeLeft.hours} />
                            <TimeSlot value={timeLeft.minutes} />
                            <TimeSlot value={timeLeft.seconds} isSeconds />
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-2xl font-bold text-primary animate-pulse">
                       {t('countdown_finished')}
                    </div>
                )}
            </div>
        </div>
    );
};
