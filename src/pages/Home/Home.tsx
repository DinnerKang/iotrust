import { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import Slider from '@/components/ui/Slider/Slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchBanner, type SliderItem } from '@/services/banner';
import { fetchService, type ServiceItem } from '@/services/service';
import { fetchFavorite, type FavoriteItem } from '@/services/favorite';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import Card from './components/Card';
import FavoriteCard from './components/FavoriteCard';

const Home = () => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();
    const [bannerData, setBannerData] = useState<SliderItem[]>([]);
    const [serviceData, setServiceData] = useState<ServiceItem[]>([]);
    const [favoriteData, setFavoriteData] = useState<FavoriteItem[]>([]);

    const getBannerData = async () => {
        const data = await fetchBanner();
        setBannerData(data);
    }
    const getServiceData = async () => {
        const data = await fetchService();
        setServiceData(data);
        console.log(data);
    }
    const getFavoriteData = async () => {
        const data = await fetchFavorite();
        setFavoriteData(data);
    }

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

  return (
    <Layout>
        <div className={styles.home}>
            <section className={styles.banner_wrap}>
                {
                    bannerData.length > 0 && (
                        <Slider data={sliderData} />
                    )
                }
            </section>
            <main>
                <h3 className={styles.title}>{t('home.favorite')}</h3>
                <article className={styles.list_wrap}>
                    <ul>
                        {
                            favoriteData.map((item) => (
                                <FavoriteCard key={item.id} {...item} onDelete={handleDelete} />
                            ))
                        }
                    </ul>
                </article>
                <h3 className={styles.title}>{t('home.list')}</h3>
                <article className={styles.list_wrap}>
                    <ul>
                        {
                            serviceData.map((item) => (
                                <Card key={item.id} {...item} />
                            ))
                        }
                    </ul>
                </article>
            </main>
        </div>
    </Layout>
  )
};

export default Home;