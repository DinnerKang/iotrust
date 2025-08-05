import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Slider } from '@/components/ui/Slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchBanner, type SliderItem } from '@/services/banner';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';

const Home = () => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();
    const [bannerData, setBannerData] = useState<SliderItem[]>([]);

    const getBannerData = async () => {
        const data = await fetchBanner();
        setBannerData(data);
    }
    
    useEffect(() => {
        getBannerData();
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
                    test
                </article>
            </main>
        </div>
    </Layout>
  )
};

export default Home;