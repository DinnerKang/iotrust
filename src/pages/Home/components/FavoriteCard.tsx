import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FavoriteItem } from '@/services/favorite';
import Modal from '@/components/ui/Modal/Modal';
import styles from './FavoriteCard.module.scss';

const baseUrl = import.meta.env.VITE_IMAGE_URL;

interface FavoriteCardProps extends FavoriteItem {
    onDelete: (id: number) => void;
}

const FavoriteCard = memo(({ id, title, icon, url, onDelete }: FavoriteCardProps) => {
    const { t } = useTranslation();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleCardClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        onDelete(id);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <li className={styles.favorite_card_wrap} onClick={handleCardClick}>
                <div className={styles.favorite_card_image}>
                    <img src={`${baseUrl}/${icon}`} alt={title} />
                </div>
                <div className={styles.favorite_card_content}>
                    <h4 className={styles.favorite_card_title}>{title}</h4>
                    <p className={styles.favorite_card_url}>{url}</p>
                </div>
                <button 
                    className={styles.delete_button}
                    onClick={handleDeleteClick}
                >
                    ✕
                </button>
            </li>

            <Modal
                isOpen={isDeleteModalOpen}
                title={t('home.favorite.delete')}
                contents={t('home.favorite.delete.contents')}
                onSuccess={handleConfirmDelete}
                onCancel={handleCancelDelete}
                successText={t('modal.confirm')}
                cancelText={t('modal.cancel')}
            />
        </>
    );
});

FavoriteCard.displayName = 'FavoriteCard';

export default FavoriteCard;