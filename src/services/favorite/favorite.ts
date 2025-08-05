import type { FavoriteItem } from './types';

const mockData: FavoriteItem[] = [
    {
        id: 1,
        title: 'OpenSea',
        icon: 'icon_opensea.png',
        url: 'https://opensea.io/',
    },
    {
        id: 2,
        title: 'MoonPay',
        icon: 'icon_moonpay.png',
        url: 'https://buy.moonpay.com/v2/buy',
    },
    {
        id: 3,
        title: 'Rarible',
        icon: 'icon_rarible.png',
        url: 'https://rarible.com/',
    },
]

export const fetchFavorite = async (): Promise<FavoriteItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, 1000);
    });
}