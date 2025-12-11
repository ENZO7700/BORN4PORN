
"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle } from 'lucide-react';
import type { TranslationKeys } from '@/lib/translations';

type HomeTabsProps = {
    t: (key: TranslationKeys) => string;
    businessModelItems: { titleKey: string; descriptionKey: string }[];
    legalAspectsKeys: string[];
    structureKeys: string[];
    conceptKeys: string[];
    marketKeys: string[];
}

export function HomeTabs({ t, businessModelItems, legalAspectsKeys, structureKeys, conceptKeys, marketKeys }: HomeTabsProps) {
    return (
        <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid h-auto w-full grid-cols-2 justify-center md:grid-cols-3 lg:flex lg:w-auto lg:flex-wrap">
                <TabsTrigger value="summary">{t('tab_summary')}</TabsTrigger>
                <TabsTrigger value="market">{t('tab_market')}</TabsTrigger>
                <TabsTrigger value="concept">{t('tab_concept')}</TabsTrigger>
                <TabsTrigger value="structure">{t('tab_structure')}</TabsTrigger>
                <TabsTrigger value="business">{t('tab_business_model')}</TabsTrigger>
                <TabsTrigger value="legal">{t('tab_legal')}</TabsTrigger>
                <TabsTrigger value="finance">{t('tab_finance')}</TabsTrigger>
            </TabsList>
            
            <Card className="mt-4">
            <CardContent className="pt-6">
                <TabsContent value="summary" className="text-center">
                <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('summary_title')}</h3>
                <p className="mb-4 text-sm text-muted-foreground md:text-base">{t('summary_project')}</p>
                <p className="mx-auto max-w-prose text-sm md:text-base">{t('summary_desc')}</p>
                <p className="mt-4 text-sm font-semibold text-primary md:text-base">{t('summary_goal')}</p>
                </TabsContent>

                <TabsContent value="market" className="text-center">
                    <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('market_analysis_title')}</h3>
                <ul className="mx-auto max-w-prose list-none space-y-2 text-sm md:text-base">
                    {marketKeys.map(key => <li key={key}>{t(key as TranslationKeys)}</li>)}
                </ul>
                </TabsContent>

                <TabsContent value="concept" className="text-center">
                    <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('concept_title')}</h3>
                <ul className="mx-auto max-w-prose list-none space-y-2 text-sm md:text-base">
                    {conceptKeys.map(key => <li key={key}>{t(key as TranslationKeys)}</li>)}
                </ul>
                </TabsContent>

                <TabsContent value="structure" className="text-center">
                    <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('structure_title')}</h3>
                    <ol className="mx-auto max-w-prose list-inside list-decimal space-y-2 text-sm md:text-base">
                        {structureKeys.map(key => <li key={key}>{t(key as TranslationKeys)}</li>)}
                    </ol>
                </TabsContent>

                <TabsContent value="business" className="text-center">
                    <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('business_title')}</h3>
                    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:text-base">
                    {businessModelItems.map(item => (
                        <div key={item.titleKey}>
                            <h4 className="font-semibold text-primary">{t(item.titleKey as TranslationKeys)}</h4>
                            <p className="text-muted-foreground">{t(item.descriptionKey as TranslationKeys)}</p>
                        </div>
                    ))}
                    </div>
                </TabsContent>
                
                <TabsContent value="legal" className="text-center">
                    <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('legal_title')}</h3>
                    <ul className="mx-auto inline-block max-w-prose list-none space-y-3 text-left text-sm md:text-base">
                    {legalAspectsKeys.map((item, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-green-500"/>
                            <span>{t(item as TranslationKeys)}</span>
                        </li>
                    ))}
                    </ul>
                </TabsContent>
                
                <TabsContent value="finance" className="text-center">
                    <h3 className="mb-4 font-headline text-xl font-semibold tracking-wide-3 md:text-2xl">{t('finance_title')}</h3>
                    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 text-sm md:grid-cols-2 md:text-base">
                    <div className="text-center">
                        <h4 className="mb-2 font-semibold text-destructive">{t('finance_costs_title')}</h4>
                        <ul className="inline-block list-inside list-disc space-y-1 text-left text-muted-foreground">
                            <li>{t('finance_costs_item1')}</li>
                            <li>{t('finance_costs_item2')}</li>
                            <li>{t('finance_costs_item3')}</li>
                            <li>{t('finance_costs_item4')}</li>
                        </ul>
                            <p className="mt-2 font-bold">{t('finance_costs_total')}</p>
                    </div>
                        <div className="text-center">
                        <h4 className="mb-2 font-semibold text-green-500">{t('finance_revenue_title')}</h4>
                        <ul className="inline-block list-inside list-disc space-y-1 text-left text-muted-foreground">
                            <li>{t('finance_revenue_item1')}</li>
                            <li>{t('finance_revenue_item2')}</li>
                            <li>{t('finance_revenue_item3')}</li>
                        </ul>
                        <p className="mt-2 font-bold">{t('finance_revenue_total')}</p>
                    </div>
                    </div>
                    <div className="mt-8 text-center">
                    <p className="font-headline text-xl font-bold tracking-wide-3 md:text-2xl">{t('finance_profit_title')}</p>
                    <p className="font-headline text-3xl font-extrabold tracking-wide-3 text-primary md:text-4xl">{t('finance_profit_amount')}</p>

                    </div>
                </TabsContent>

            </CardContent>
            </Card>
        </Tabs>
    );
}
