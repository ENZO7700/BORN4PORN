
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations, TranslationKeys, Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('sk');

  useEffect(() => {
    const langFromUrl = new URLSearchParams(window.location.search).get('lang');
    if (langFromUrl && ['sk', 'en', 'pl', 'ar', 'ru'].includes(langFromUrl)) {
      setLanguage(langFromUrl as Language);
    }
  }, []);

  const t = (key: TranslationKeys) => {
    return translations[language]?.[key] || translations['sk'][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
