import type { SliderItem } from "./types";

const mockData: SliderItem[] = [
    {
        id: 1,
        ko: {
            img: 'banner_mapo_en.png',
            link: 'https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
        },
        en: {
            img: 'banner_mapo_kr.png',
            link: 'https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
        }
    },
    {
        id: 2,
        ko: {
            img: 'banner_dcent.png',
            link: 'https://store-kr.dcentwallet.com',
            description: '디센트 지문인증형 지갑으로 한층 더 강화된 보안을 경험하세요!',
            text: '구매하기',
        },
        en: {
            img: 'banner_dcent.png',
            link: 'https://store.dcentwallet.com',
            description: 'Enhance your security with D\'CENT biometric wallet',
            text: 'Buy Now',
        }
    },
    {
        id: 3,
        ko: {
            img: 'banner_blog.png',
            link: 'https://store-kr.dcentwallet.com/blogs/post',
            description: '새로운 디센트 블로그를 방문하여 최신 업데이트를 먼저 확인해보세요!',
            text: '확인하기',
        },
        en: {
            img: 'banner_blog.png',
            link: 'https://store.dcentwallet.com/blogs/post',
            description: 'Visit the new D\'CENT Blog to explore the latest updates first!',
            text: 'Explore',
        }
    }
]

export const fetchBanner = async (): Promise<SliderItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 1000);
    });
}