
"use client";

import dynamic from 'next/dynamic';
import type { TranslationKeys } from '@/lib/translations';

const HomeTabs = dynamic(() => import('@/app/_components/home-tabs').then(mod => mod.HomeTabs), { ssr: false });

type HomeTabsWrapperProps = {
    t: (key: TranslationKeys) => string;
    businessModelItems: { titleKey: string; descriptionKey: string }[];
    legalAspectsKeys: string[];
    structureKeys: string[];
    conceptKeys: string[];
    marketKeys: string[];
}

export function HomeTabsWrapper({ t, businessModelItems, legalAspectsKeys, structureKeys, conceptKeys, marketKeys }: HomeTabsWrapperProps) {
  return (
    <HomeTabs
        t={t}
        businessModelItems={businessModelItems}
        legalAspectsKeys={legalAspectsKeys}
        structureKeys={structureKeys}
        conceptKeys={conceptKeys}
        marketKeys={marketKeys}
    />
  );
}
