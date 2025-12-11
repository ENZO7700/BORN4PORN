
"use client";

import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  onFinished: () => void;
}

export function CountdownTimer({ targetDate, onFinished }: CountdownTimerProps) {
    
    return (
        <div 
            className="relative w-screen h-screen text-white overflow-hidden"
            style={{ background: `url('/zavertv.png') center center / cover no-repeat` }}
        >
            <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: '260px' }}>
                <div className="bg-black rounded-lg pb-8 pt-7 px-8 inline-flex items-center justify-center gap-x-2">
                    {/* Censorship black bar over the numbers */}
                    <div className="h-[4.5rem] w-[22rem] bg-black"></div>
                </div>
            </div>
        </div>
    );
};
