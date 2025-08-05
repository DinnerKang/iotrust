import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  
  // 환경변수에서 언어 설정 가져오기
  const currentLanguage = (import.meta.env.VITE_DEFAULT_LANGUAGE as Language) || 'ko';

  useEffect(() => {
    // 환경변수 기반으로 언어 설정
    i18n.changeLanguage(currentLanguage);
  }, [i18n, currentLanguage]);

  const contextValue: LanguageContextType = {
    currentLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 