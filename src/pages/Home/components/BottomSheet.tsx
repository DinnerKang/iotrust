import { createPortal } from 'react-dom';
import type { ServiceItem } from '@/services/service';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import styles from './BottomSheet.module.scss';

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    data?: ServiceItem;
}

const BottomSheet = ({ isOpen, onClose, data }: BottomSheetProps) => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    if (!isOpen) return null;

    const description = data ? (currentLanguage === 'ko' ? data.ko : data.en) : '';
    const baseUrl = import.meta.env.VITE_IMAGE_URL;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleVisitService = () => {
        if (data?.url) {
            window.open(data.url, '_blank');
        }
    };

    return createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.bottomSheet}>
                <div className={styles.handle}></div>

                {data && (
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.serviceIcon}>
                                <img src={`${baseUrl}/${data.icon}`} alt={data.title} />
                            </div>
                            <div className={styles.serviceInfo}>
                                <h2 className={styles.title}>{data.title}</h2>
                                {data.network && data.network.length > 0 && (
                                    <div className={styles.networks}>
                                        {data.network.map((network, index) => (
                                            <span key={index} className={styles.networkTag}>
                                                {network}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {
                            data.url && (
                                <p className={styles.url}>{data.url}</p>
                            )
                        }

                        <div className={styles.description}>
                            <h3>{t('home.bottomSheet.description')}</h3>
                            <p>{description}</p>
                        </div>

                        <div className={styles.footer}>
                            {data.url && (
                                <button className={styles.visitButton} onClick={handleVisitService}>
                                    {t('home.bottomSheet.visit')}
                                </button>
                            )}
                            <button className={styles.closeButton} onClick={onClose}>
                                {t('home.bottomSheet.close')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default BottomSheet;