
# born4slayada

# BORN4PORN / Unicorn & Gametusy - Prototyp platformy

Toto je funkčný prototyp webovej platformy pre inovatívny projekt "Unicorn & Gametusy", ktorého vlajkovou loďou je 18+ reality show "Born 4 Porn". Aplikácia bola vyvinutá v rámci Firebase Studia s cieľom demonštrovať kľúčové funkcie a technickú realizovateľnosť.

Aplikácia je postavená na moderných technológiách ako Next.js, TypeScript, Tailwind CSS a ShadCN pre UI. Backendové služby a autentifikáciu zabezpečuje Firebase. Aplikácia je navrhnutá tak, aby fungovala bez potreby tajných kľúčov pre jednoduché nasadenie.


## Kľúčové funkcie

- **Dynamický Dashboard**: Prehľadné štatistiky o príjmoch, predplatiteľoch a aktivite v reálnom čase pre administrátorov.
- **Live stránka s interakciami**: Simulácia živého prenosu s live chatom v reálnom čase a systémom hlasovania pre súťažiacich.
- **Archív obsahu**: Galéria videí s hodnoteniami, popismi a filtrovaním, postavená na Firestore.
- **Pokročilá správa účtu**: Možnosť pre používateľov spravovať svoj profil a notifikácie.
- **Viacúrovňový cenník**: Prezentácia rôznych modelov predplatného (mesačné, PPV, sezónne).
- **Online prihlášky do castingu**: Formulár pre uchádzačov s validáciou a ukladaním dát priamo do Firestore.
- **Viacjazyčná podpora**: Aplikácia je plne preložená do slovenčiny, angličtiny a poľštiny.
- **Responzívny dizajn**: Plne optimalizované pre desktop, tablet aj mobilné zariadenia.
- **Zabezpečená autentifikácia**: Prihlásenie a registrácia používateľov pomocou Firebase Authentication v modálnych oknách.

## Technologický balík

- **Framework**: Next.js (App Router)
- **Jazyk**: TypeScript
- **Štýlovanie**: Tailwind CSS
- **UI Komponenty**: ShadCN/UI
- **Backend & Databáza**: Firebase (Firestore, Authentication, Hosting)
- **Validácia**: Zod
- **Ikony**: Lucide React

## Spustenie projektu

1.  **Inštalácia závislostí:**
    ```bash
    npm install
    ```

2.  **Spustenie vývojového servera:**
    ```bash
    npm run dev
    ```

Aplikácia bude dostupná na adrese `http://localhost:9002`.

## Nasadenie na Vercel (Hosting)

Projekt je plne pripravený na nasadenie na **Vercel** a **nevyžaduje žiadne tajné kľúče (environment variables)**.

**Krok 1: Uložte zmeny na GitHub**

Ak ste urobili akékoľvek zmeny, uložte ich na GitHub pomocou týchto príkazov:
```bash
git add .
git commit -m "Pripravené na nasadenie na Vercel"
git push origin main
```

**Krok 2: Prepojte projekt s Vercelom (jednorazová akcia)**

1.  Otvorte si stránku: **[vercel.com/new](https://vercel.com/new)**
2.  Nájdite a vyberte váš repozitár: **`ENZO7700/born4slayada`**.
3.  Vercel automaticky rozpozná, že ide o Next.js projekt. Všetky nastavenia buildu by mali byť predvyplnené.
4.  **Preskočte sekciu Environment Variables.** Nie sú potrebné.
5.  Kliknite na modré tlačidlo **Deploy**.

Vercel sa postará o zvyšok. Po dokončení vám poskytne link, na ktorom bude vaša aplikácia bežať. Všetky budúce nasadenia už budú automatické po každom `git push`.


## Štruktúra projektu

- `src/app/`: Hlavný adresár Next.js aplikácie (App Router).
- `src/components/`: Zdieľané React komponenty.
- `src/firebase/`: Všetka logika pre pripojenie a interakciu s Firebase.
- `src/context/`: React contexty (napr. pre viacjazyčnosť).
- `src/lib/`: Pomocné funkcie a definície.
- `firestore.rules`: Bezpečnostné pravidlá pre Firestore databázu.
- `vercel.json`: Konfigurácia pre Vercel.

- **Autor**: Filip Kosorin
- **Kontakt**: [H4CK3D.me](https://youh4ck3d.me)
