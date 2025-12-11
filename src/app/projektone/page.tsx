
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { UnicornLogo } from '@/components/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import imageData from "@/app/lib/placeholder-images.json";
import { useLanguage } from '@/context/language-context';
import { CheckCircle, Palette, Monitor, Share2 } from 'lucide-react';

const galleryImages = [
    {
        src: imageData.gametusyGallery1.src,
        alt: "Gametusy Logo Design",
        hint: imageData.gametusyGallery1['data-ai-hint'],
    },
    {
        src: imageData.gametusyGallery2.src,
        alt: "Gametusy Web Design",
        hint: imageData.gametusyGallery2['data-ai-hint'],
    },
    {
        src: imageData.gametusyGallery3.src,
        alt: "Gametusy Social Media",
        hint: imageData.gametusyGallery3['data-ai-hint'],
    },
];

export default function ProjektOnePage() {
    const { t } = useLanguage();

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <UnicornLogo className="h-8 w-8 text-primary" />
                        <span className="font-headline text-lg font-semibold tracking-wide-3">EROTICON</span>
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link href="/aboutus">
                            <Button variant="ghost">About us</Button>
                        </Link>
                        <LanguageSwitcher />
                         <Link href="/dashboard">
                            <Button>{t('home_login')}</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <section className="relative w-full overflow-hidden pt-24 pb-12 text-center md:pt-32 md:pb-20">
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src={imageData.gametusyHero.src} 
                            alt="Gametusy Project Hero"
                            fill
                            className="object-cover opacity-20"
                            data-ai-hint={imageData.gametusyHero['data-ai-hint']}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                    </div>
                    <div className="container relative px-4">
                        <h1 className="font-headline text-4xl font-bold tracking-wide-3 text-foreground drop-shadow-lg sm:text-5xl md:text-6xl">
                            Projekt GAMETUSY (F4CKTUSY)
                        </h1>
                        <p className="mx-auto mt-4 max-w-[700px] text-lg font-semibold text-foreground/80 drop-shadow-md md:text-xl">
                            Vizuálna identita pre modernú značku spodnej bielizne, ktorá búra tabu.
                        </p>
                    </div>
                </section>

                <section className="container max-w-5xl py-16 md:py-24">
                     <Card className="bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-center font-headline text-3xl tracking-wide-3 md:text-4xl">O Projekte</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground md:text-lg">
                            <p>
                                GAMETUSY (F4CKTUSY) je odvážna a provokatívna značka spodnej bielizne, ktorá sa zrodila na pomedzí módy, umenia a digitálnej kultúry. Našou úlohou bolo vytvoriť komplexnú vizuálnu identitu, ktorá by oslovila mladú, sebavedomú generáciu, ktorá sa nebojí vyjadriť svoju individualitu.
                            </p>
                            <p>
                                Cieľom bolo navrhnúť značku, ktorá je nielen vizuálne príťažlivá, ale nesie aj silné posolstvo – oslavu tela, sebaprijatia a slobody.
                            </p>
                        </CardContent>
                    </Card>
                </section>
                
                <section className="bg-muted/20 py-16 md:py-24">
                    <div className="container max-w-5xl">
                        <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-wide-3 md:text-4xl">Rozsah Prác</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <Palette className="h-12 w-12 text-primary" />
                                <h3 className="mt-4 text-xl font-bold">Logo & Branding</h3>
                                <p className="mt-2 text-muted-foreground">Návrh moderného, škálovateľného loga a definovanie kompletnej vizuálnej identity vrátane farebnej palety a typografie.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Monitor className="h-12 w-12 text-primary" />
                                <h3 className="mt-4 text-xl font-bold">Webdizajn</h3>
                                <p className="mt-2 text-muted-foreground">Dizajn minimalistického a funkčného e-shopu s dôrazom na prémiovú prezentáciu produktov a pútavý používateľský zážitok.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Share2 className="h-12 w-12 text-primary" />
                                <h3 className="mt-4 text-xl font-bold">Sociálne Siete</h3>
                                <p className="mt-2 text-muted-foreground">Vytvorenie šablón a stratégie pre vizuálnu komunikáciu na platformách ako Instagram a TikTok, ktorá reflektuje charakter značky.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container max-w-6xl">
                         <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-wide-3 md:text-4xl">Galéria</h2>
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {galleryImages.map((image, index) => (
                                <Card key={index} className="group overflow-hidden">
                                    <div className="relative aspect-4/3">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={image.hint}
                                        />
                                    </div>
                                </Card>
                            ))}
                         </div>
                    </div>
                </section>

            </main>

            <footer className="border-t">
                <div className="container flex flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                         <UnicornLogo className="h-6 w-6 text-primary" />
                         <p className="text-sm text-muted-foreground">{t('footer_text')}</p>
                    </div>
                     <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Link href="/aboutus" className="hover:text-primary hover:underline underline-offset-4">
                           O Nás
                        </Link>
                         <p>
                           Created by <a href="https://youh4ck3d.me" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">Filip Kosorin</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
