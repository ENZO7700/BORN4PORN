
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
        "font-bold font-mono tracking-widest",
        isSeconds ? "text-red-500" : "text-white"
    )}>
        {String(value).padStart(2, '0')}
    </div>
);

const Colon = () => <div className="text-white font-bold font-mono tracking-widest pb-2">:</div>;

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
            <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: '270px' }}>
                 {timeLeft ? (
                    <div className="bg-black rounded-lg pt-3 pb-8 px-8 inline-flex items-center justify-center gap-x-2">
                        <div className="flex items-baseline gap-x-2 text-5xl">
                            <TimeSlot value={timeLeft.days} />
                            <Colon />
                            <TimeSlot value={timeLeft.hours} />
                            <Colon />
                            <TimeSlot value={timeLeft.minutes} />
                            <Colon />
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
