"use client";

import { CountdownTimer } from './_components/countdown-timer';

const TARGET_DATE = "2025-12-21T16:00:00";

export default function HomePage() {
  // The page is now static and only displays the countdown component
  // without any redirection or timer logic. The onFinished prop is
  // passed an empty function as it's required by the component.
  return <CountdownTimer targetDate={TARGET_DATE} onFinished={() => {}} />;
}
