import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Slider from '@/components/ui/Slider/Slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchBanner, type SliderItem } from '@/services/banner';
import { fetchService, type ServiceItem } from '@/services/service';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import Card from './components/Card';

const Home = () => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();
    console.log(currentLanguage)
    const [bannerData, setBannerData] = useState<SliderItem[]>([]);
    const [serviceData, setServiceData] = useState<ServiceItem[]>([]);

    const getBannerData = async () => {
        const data = await fetchBanner();
        setBannerData(data);
    }
    const getServiceData = async () => {
        const data = await fetchService();
        setServiceData(data);
        console.log(data);
    }

    useEffect(() => {
        getBannerData();
        getServiceData();
    }, []);

    // SliderItem을 SliderData로 변환 (현재 선택된 언어에 따라)
    const sliderData = bannerData.map(item => ({
        ...item[currentLanguage],
        id: item.id
    }));

  return (
    <Layout>
        <div style={{ padding: '20px' }}>
            <section className={styles.banner_wrap}>
                {
                    bannerData.length > 0 && (
                        <Slider data={sliderData} />
                    )
                }
            </section>
            <main>
                <h2>{t('home.favorite')}</h2>
                <article>
                    test
                </article>
                <h3>{t('home.list')}</h3>
                <article>
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