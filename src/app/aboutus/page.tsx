
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { UnicornLogo } from '@/components/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import imageData from "@/app/lib/placeholder-images.json";
import { useLanguage } from '@/context/language-context';
import { ArrowRight } from 'lucide-react';

const teamMembers = [
    {
        name: "Filip Kosorin",
        position: "CEO & Visionary",
        image: "https://picsum.photos/seed/ceo/200/200",
        imageHint: "man portrait business",
        quote: "Posúvame hranice zábavy pre dospelých. Vytvárame zážitky, ktoré sú odvážne, interaktívne a nezabudnuteľné."
    },
    {
        name: "Jane Doe",
        position: "Creative Director",
        image: "https://picsum.photos/seed/creative/200/200",
        imageHint: "woman portrait creative",
        quote: "Naša show je plátno, na ktorom sa realita a fantázia spájajú v umenie. Každý detail má svoj význam."
    },
    {
        name: "John Smith",
        position: "Technical Lead",
        image: "https://picsum.photos/seed/tech/200/200",
        imageHint: "man portrait tech",
        quote: "Staviame platformu budúcnosti – robustnú, bezpečnú a pripravenú na milióny divákov po celom svete."
    }
];

export default function AboutUsPage() {
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
                <section className="relative w-full overflow-hidden py-24 text-center md:py-32">
                    <div className="absolute inset-0 z-0">
                        <Image 
                            src={imageData.aboutUsHero.src} 
                            alt="Team background"
                            fill
                            className="object-cover opacity-20"
                            data-ai-hint={imageData.aboutUsHero['data-ai-hint']}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                    </div>
                    <div className="container relative px-4">
                        <h1 className="font-headline text-4xl font-bold tracking-wide-3 text-foreground drop-shadow-lg sm:text-5xl md:text-6xl">
                            O Nás: Vízia a Tím
                        </h1>
                        <p className="mx-auto mt-4 max-w-[700px] text-lg font-semibold text-foreground/80 drop-shadow-md md:text-xl">
                            Sme skupina inovátorov, ktorá mení pravidlá hry v zábavnom priemysle pre dospelých.
                        </p>
                    </div>
                </section>

                <section className="container max-w-5xl py-16 md:py-24">
                     <Card className="bg-card/80 backdrop-blur">
                        <CardHeader>
                            <CardTitle className="text-center font-headline text-3xl tracking-wide-3 md:text-4xl">Naša Misia</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground md:text-lg">
                            <p className="mx-auto max-w-prose">
                                Veríme, že zábava pre dospelých môže byť viac než len pasívny obsah. Našou misiou je vytvárať prémiové, interaktívne a odvážne zážitky, ktoré posúvajú hranice kreativity a technológie. Staviame komunitu, kde sa otvorenosť, rešpekt a túžba po nových zážitkoch stretávajú v bezpečnom a modernom prostredí.
                            </p>
                        </CardContent>
                    </Card>
                </section>
                
                <section className="py-16 md:py-24">
                    <div className="container max-w-6xl">
                        <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-wide-3 md:text-4xl">Zoznámte sa s Tímom</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <Avatar className="h-32 w-32 border-4 border-primary">
                                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.imageHint} />
                                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
                                    <p className="font-semibold text-primary">{member.position}</p>
                                    <p className="mt-2 text-sm text-muted-foreground">"{member.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="border-t bg-muted/20 py-16 md:py-24">
                    <div className="container max-w-4xl">
                        <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-wide-3 md:text-4xl">Naše Projekty</h2>
                        <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-primary/20">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative aspect-video md:aspect-auto">
                                    <Image
                                        src={imageData.gametusyCard.src}
                                        alt="Projekt GAMETUSY"
                                        fill
                                        className="object-cover"
                                        data-ai-hint={imageData.gametusyCard['data-ai-hint']}
                                    />
                                </div>
                                <div className="flex flex-col p-6">
                                    <h3 className="text-2xl font-bold">Projekt GAMETUSY (F4CKTUSY)</h3>
                                    <p className="mt-2 text-muted-foreground">Vizuálna identita pre modernú značku spodnej bielizne.</p>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Logo</li>
                                        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Webdizajn</li>
                                        <li className="flex items-center gap-2"><span className="text-primary">✓</span> Sociálne siete</li>
                                    </ul>
                                    <Button asChild className="mt-6 w-full md:w-auto self-start">
                                        <Link href="/projektone">
                                            Zobraziť Projekt <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                <section className="border-t py-16 text-center md:py-20">
                    <div className="container">
                        <h2 className="font-headline text-2xl font-bold md:text-3xl">Pripravení zažiť revolúciu?</h2>
                        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
                            Pridajte sa k nám a staňte sa súčasťou novej éry zábavy.
                        </p>
                        <div className="mt-8">
                             <Button size="lg" asChild>
                               <Link href="/pricing">Zobraziť cenník</Link>
                            </Button>
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
