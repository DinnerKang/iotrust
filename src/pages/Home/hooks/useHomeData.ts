import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchBanner, type SliderItem } from '@/services/banner';
import { fetchService, type ServiceItem } from '@/services/service';
import { fetchFavorite, type FavoriteItem } from '@/services/favorite';

export const useHomeData = () => {
    const { currentLanguage } = useLanguage();
    const [bannerData, setBannerData] = useState<SliderItem[]>([]);
    const [serviceData, setServiceData] = useState<ServiceItem[]>([]);
    const [favoriteData, setFavoriteData] = useState<FavoriteItem[]>([]);

    const getBannerData = async () => {
        const data = await fetchBanner();
        setBannerData(data);
    };

    const getServiceData = async () => {
        const data = await fetchService();
        setServiceData(data);
    };

    const getFavoriteData = async () => {
        const data = await fetchFavorite();
        setFavoriteData(data);
    };

    const handleDelete = useCallback((id: number) => {
        setFavoriteData(favoriteData.filter(item => item.id !== id));
    }, [favoriteData]);

    useEffect(() => {
        getBannerData();
        getServiceData();
        getFavoriteData();
    }, []);

    // SliderItem을 SliderData로 변환 (현재 선택된 언어에 따라)
    const sliderData = bannerData.map(item => ({
        ...item[currentLanguage],
        id: item.id
    }));

    return {
        bannerData,
        serviceData,
        favoriteData,
        sliderData,
        handleDelete,
    };
};
