import Layout from '@/components/layout/Layout';
import Slider from '@/components/ui/Slider/Slider';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import Card from './components/Card';
import FavoriteCard from './components/FavoriteCard';
import { useHomeData } from './hooks/useHomeData';

const Home = () => {
    const { t } = useTranslation();
    const { bannerData, serviceData, favoriteData, sliderData, handleDelete } = useHomeData();

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