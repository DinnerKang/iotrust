import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      'home.favorite': '즐겨찾기',
      'home.list': '목록',
    }
  },
  en: {
    translation: {
      'home.favorite': 'Favorite',
      'home.list': 'List',
    }
  }
};

// 환경변수에서 기본 언어 설정 가져오기
const defaultLanguage = import.meta.env.VITE_LANGUAGE || 'ko';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 