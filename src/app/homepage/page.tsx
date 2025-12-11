
"use client";

import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { UnicornLogo } from '@/components/logo';
import { BarChart, Euro, Globe } from 'lucide-react';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from "@/context/language-context";
import type { TranslationKeys } from '@/lib/translations';
import { HomeTabsWrapper } from '@/app/_components/home-tabs-wrapper';
import imageData from "@/app/lib/placeholder-images.json";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth, useUser, initiateEmailSignIn, initiateEmailSignUp, useFirestore } from "@/firebase";
import { useToast } from "@/hooks/use-toast";


function LoginDialog({ onSwitchToRegister, onLoginSuccess }: { onSwitchToRegister: () => void, onLoginSuccess: () => void }) {
    const { t } = useLanguage();
    const auth = useAuth();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        setIsLoading(true);
        initiateEmailSignIn(auth, email, password, 
          (error) => { // onError
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.message,
            });
            setIsLoading(false);
          },
          () => { // onSuccess
            setIsLoading(false);
            onLoginSuccess();
          }
        );
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>Enter your email below to login to your account.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email-login" className="text-right">Email</Label>
                        <Input id="email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password-login" className="text-right">Password</Label>
                        <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" required />
                    </div>
                </div>
                <DialogFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</Button>
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Button variant="link" className="p-0 h-auto" onClick={onSwitchToRegister}>Sign up</Button>
                    </p>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

function RegisterDialog({ onSwitchToLogin, onRegisterSuccess }: { onSwitchToLogin: () => void, onRegisterSuccess: () => void }) {
    const { t } = useLanguage();
    const auth = useAuth();
    const firestore = useFirestore();
    const { toast } = useToast();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth || !firestore) return;
        setIsLoading(true);

        initiateEmailSignUp(auth, firestore, email, password, { firstName, lastName }, 
          (error) => { // onError
            toast({
                variant: "destructive",
                title: "Sign Up Failed",
                description: error.message,
            });
            setIsLoading(false);
          },
          () => { // onSuccess
             setIsLoading(false);
             onRegisterSuccess();
          }
        );
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogDescription>Enter your information to create an account.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSignUp}>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="firstName" className="text-right">First Name</Label>
                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lastName" className="text-right">Last Name</Label>
                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email-register" className="text-right">Email</Label>
                        <Input id="email-register" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password-register" className="text-right">Password</Label>
                        <Input id="password-register" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="col-span-3" required />
                    </div>
                </div>
                <DialogFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Creating Account..." : "Create an account"}</Button>
                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Button variant="link" className="p-0 h-auto" onClick={onSwitchToLogin}>Login</Button>
                    </p>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}


export default function HomePage() {
  const { t } = useLanguage();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  useEffect(() => {
    // If a user is already logged in (e.g. from a previous session), redirect to the dashboard
    if (!isUserLoading && user) {
        router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  }
  
  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  }

  const handleAuthSuccess = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    router.push('/dashboard');
  }

  const stats = [
    {
      icon: Globe,
      value: '100 mld. USD',
      labelKey: 'global_market',
    },
    {
      icon: BarChart,
      value: '3 mld. Kč',
      labelKey: 'czech_market',
    },
    {
      icon: Euro,
      value: '50 mil. €',
      labelKey: 'slovak_market',
    },
  ];

const businessModelItems = [
    { titleKey: 'business_item1_title', descriptionKey: 'business_item1_desc' },
    { titleKey: 'business_item2_title', descriptionKey: 'business_item2_desc' },
    { titleKey: 'business_item3_title', descriptionKey: 'business_item3_desc' },
    { titleKey: 'business_item4_title', descriptionKey: 'business_item4_desc' },
    { titleKey: 'business_item5_title', descriptionKey: 'business_item5_desc' }
];

const legalAspectsKeys: ('legal_item1' | 'legal_item2' | 'legal_item3' | 'legal_item4' | 'legal_item5')[] = [
    'legal_item1',
    'legal_item2',
    'legal_item3',
    'legal_item4',
    'legal_item5',
];

const structureKeys: ('structure_item1' | 'structure_item2' | 'structure_item3' | 'structure_item4' | 'structure_item5')[] = [
    'structure_item1',
    'structure_item2',
    'structure_item3',
    'structure_item4',
    'structure_item5',
];

const conceptKeys: ('concept_item1' | 'concept_item2' | 'concept_item3' | 'concept_item4' | 'concept_item5')[] = [
    'concept_item1',
    'concept_item2',
    'concept_item3',
    'concept_item4',
    'concept_item5',
];

const marketKeys: ('market_global' | 'market_cz' | 'market_sk' | 'market_trend')[] = [
    'market_global',
    'market_cz',
'market_sk',
    'market_trend'
];

  if (isUserLoading || user) { // If loading or user exists, show a blank screen or loader to avoid flicker
      return (
          <div className="flex h-screen w-screen items-center justify-center bg-black">
            <span className="text-4xl font-bold text-white">?</span>
          </div>
      )
  }


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
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                    <Button>{t('home_login')}</Button>
                </DialogTrigger>
                <LoginDialog onSwitchToRegister={openRegister} onLoginSuccess={handleAuthSuccess} />
            </Dialog>
            <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <RegisterDialog onSwitchToLogin={openLogin} onRegisterSuccess={handleAuthSuccess} />
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-20 text-center md:py-28 lg:py-32">
            <div className="absolute inset-0 z-0">
                 <Image 
                    src={imageData.homeHero.src} 
                    alt="Eroticon Reality Show"
                    fill
                    className="object-cover opacity-30"
                    data-ai-hint={imageData.homeHero['data-ai-hint']}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
            </div>
            <div className="container relative px-4 text-center">
                <h1 className="font-headline text-4xl font-bold tracking-wide-3 text-foreground drop-shadow-lg [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-7xl">
                  {t('home_title')}
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-lg font-semibold text-foreground/80 drop-shadow-md [text-wrap:balance] md:text-xl">
                  {t('home_subtitle')}
                </p>
                 <div className="mt-8">
                    <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                      <DialogTrigger asChild>
                         <Button size="lg">Get Started</Button>
                      </DialogTrigger>
                       <RegisterDialog onSwitchToLogin={openLogin} onRegisterSuccess={handleAuthSuccess} />
                    </Dialog>
                </div>
            </div>
        </section>

        <section className="border-y">
          <div className="container px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <stat.icon className="h-10 w-10 text-primary md:h-12 md:w-12" />
                  <p className="mt-4 font-headline text-3xl font-bold tracking-wide-3 md:text-4xl">{stat.value}</p>
                  <p className="text-muted-foreground">{t(stat.labelKey as any)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full my-16 bg-card-texture px-4 text-center sm:px-6 md:my-24 lg:px-8">
            <div className="container">
                <h2 className="font-headline text-2xl font-bold tracking-wide-3 [text-wrap:balance] sm:text-4xl md:text-3xl">{t('partner_search_title')}</h2>
                <p className="mt-4 font-headline text-4xl font-extrabold tracking-wide-3 text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                {t('partner_investment')}
                </p>
                <div className="mx-auto mt-8 max-w-4xl rounded-lg border border-border bg-card p-6 text-center shadow-lg md:mt-12 md:p-8">
                    <p className="text-base text-foreground [text-wrap:balance] md:text-lg">
                    {t('formal_text')}
                    </p>
                    <p className="mt-6 text-lg font-bold text-primary [text-wrap:balance] md:text-xl">
                    {t('marketing_text')}
                    </p>
                </div>
            </div>
        </section>

        <section id="details" className="w-full py-16 md:py-24">
          <div className="container max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-8 font-headline text-3xl font-bold tracking-wide-3 text-center [text-wrap:balance] md:mb-12 md:text-4xl lg:text-5xl">{t('pack_title')}</h2>
             <HomeTabsWrapper
                t={t}
                businessModelItems={businessModelItems}
                legalAspectsKeys={legalAspectsKeys}
                structureKeys={structureKeys}
                conceptKeys={conceptKeys}
                marketKeys={marketKeys}
            />
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
