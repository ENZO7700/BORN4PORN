
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";

export default function PricingPage() {
    const { t } = useLanguage();

    const subscriptionFeatures = [
        t('feature_all_episodes'),
        t('feature_behind_the_scenes'),
        t('feature_uncensored'),
        t('feature_early_casting'),
        t('feature_cancel_anytime'),
    ];

    const ppvFeatures = [
        t('feature_watch_live'),
        t('feature_live_voting'),
        t('feature_24h_replay'),
    ];

    const seasonPassFeatures = [
        t('feature_all_season_episodes'),
        t('feature_all_ppv'),
        t('feature_best_value'),
    ]

    return (
        <div className="space-y-8 md:space-y-12">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{t('pricing_title')}</h1>
                <p className="mx-auto mt-2 max-w-2xl text-md text-muted-foreground sm:text-lg">{t('pricing_desc')}</p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-6 md:gap-8 lg:grid-cols-3">
                
                {/* Subscription Card */}
                <Card className="relative flex flex-col border-2 border-primary shadow-lg shadow-primary/20">
                     <Badge variant="default" className="absolute -top-3 left-1/2 -translate-x-1/2">{t('most_popular')}</Badge>
                    <CardHeader className="pt-8 text-center">
                        <CardTitle className="text-2xl md:text-3xl">{t('all_access')}</CardTitle>
                        <CardDescription>{t('all_access_desc')}</CardDescription>
                        <div className="mt-4 text-4xl font-bold md:text-5xl">€19.99<span className="text-base font-normal text-muted-foreground md:text-lg">{t('per_month')}</span></div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            {subscriptionFeatures.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary"/>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto flex-col gap-2 pt-6">
                        <Button className="w-full" size="lg">{t('subscribe_now')}</Button>
                        <Button variant="outline" className="w-full">{t('subscribe_with_crypto')}</Button>
                    </CardFooter>
                </Card>

                {/* PPV Card */}
                <Card className="flex flex-col">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl md:text-3xl">{t('ppv')}</CardTitle>
                        <CardDescription>{t('ppv_desc')}</CardDescription>
                        <div className="mt-4 text-4xl font-bold md:text-5xl">€29.99<span className="text-base font-normal text-muted-foreground md:text-lg">{t('per_episode')}</span></div>
                    </CardHeader>
                    <CardContent className="flex-1">
                         <ul className="space-y-3">
                            {ppvFeatures.map(feature => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary"/>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-auto flex-col gap-2 pt-6">
                        <Button className="w-full" size="lg" variant="secondary">{t('buy_episode')}</Button>
                        <Button variant="outline" className="w-full">{t('buy_with_crypto')}</Button>
                    </CardFooter>
                </Card>
                
                {/* Season Pass Card */}
                <Card className="flex flex-col">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl md:text-3xl">{t('season_pass')}</CardTitle>
                        <CardDescription>{t('season_pass_desc')}</CardDescription>
                        <div className="mt-4 text-4xl font-bold md:text-5xl">€100<span className="text-base font-normal text-muted-foreground md:text-lg">{t('per_season')}</span></div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            {seasonPassFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Check className="mt-1 h-5 w-5 shrink-0 text-primary"/>
                                    <span>{feature}</span>
                                </li>
                             ))}
                        </ul>
                    </CardContent>
                     <CardFooter className="mt-auto flex-col gap-2 pt-6">
                        <Button className="w-full" size="lg" variant="secondary">{t('buy_season_pass')}</Button>
                        <Button variant="outline" className="w-full">{t('buy_with_crypto')}</Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
}
