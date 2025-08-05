import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ko: {
    translation: {
      'home.favorite': '즐겨찾기',
      'home.list': '목록',
      'home.bottomSheet.description': '서비스 설명',
      'home.bottomSheet.visit': '서비스 방문하기',
      'home.bottomSheet.close': '닫기',
      'home.favorite.delete': '즐겨찾기 삭제',
      'home.favorite.delete.contents': '이 사이트를 즐겨찾기 목록에서 삭제 하시겠습니까?',

      // Modal
      'modal.confirm': '확인',
      'modal.cancel': '취소',
    }
  },
  en: {
    translation: {
      'home.favorite': 'Favorite',
      'home.list': 'List',
      'home.bottomSheet.description': 'Service Description',
      'home.bottomSheet.visit': 'Visit Service',
      'home.bottomSheet.close': 'Close',
      'home.favorite.delete': 'Delete Favorite',
      'home.favorite.delete.contents': 'Are you sure you want to delete this site from your favorites?',
      
      // Modal
      'modal.confirm': 'Confirm',
      'modal.cancel': 'Cancel',
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