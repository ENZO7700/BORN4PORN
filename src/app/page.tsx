
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CountdownTimer } from './_components/countdown-timer';
import { UnicornLogo } from '@/components/logo';

const TARGET_DATE = "2025-12-21T16:00:00";

export default function HomePage() {
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // Check if countdown is already finished on mount
    if (new Date() > new Date(TARGET_DATE)) {
      setIsCountdownFinished(true);
      router.replace('/homepage');
    }
  }, [router]);

  const handleCountdownFinish = () => {
    setIsCountdownFinished(true);
    router.replace('/homepage');
  };
  
  if (!isClient) {
      return (
          <div className="flex h-screen w-screen items-center justify-center bg-background">
              <UnicornLogo className="h-16 w-16 animate-pulse text-primary" />
          </div>
      );
  }

  if (isCountdownFinished) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <UnicornLogo className="h-16 w-16 animate-pulse text-primary" />
        </div>
    );
  }

  return <CountdownTimer targetDate={TARGET_DATE} onFinished={handleCountdownFinish} />;
}
