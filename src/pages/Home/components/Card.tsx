import { useState, memo, useCallback } from 'react';
import type { ServiceItem } from '@/services/service';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCurrentEnv } from '@/utils/env';
import { getCurrentOS } from '@/utils/os';
import BottomSheet from './BottomSheet';
import styles from './Card.module.scss';

const baseUrl = import.meta.env.VITE_IMAGE_URL;


const Card = memo((props: ServiceItem) => {
    const { currentLanguage } = useLanguage();
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const description = currentLanguage === 'ko' ? props.ko : props.en;

    // description이 없으면 렌더링하지 않음 (해당 국가 미노출)
    if (!description) return null;

    // 현재 환경과 OS 확인
    const currentEnv = getCurrentEnv();
    const currentOS = getCurrentOS();

    // env 조건 확인 - env가 없으면 전체 노출, 있으면 해당 환경에만 노출
    if (props.env && !props.env.includes(currentEnv)) {
        return null;
    }
    // os 조건 확인 - os가 없으면 전체 노출, 있으면 해당 OS에만 노출
    if (props.os && currentOS !== 'other' && !props.os.includes(currentOS)) {
        return null;
    }

    const handleClick = () => {
        setIsBottomSheetOpen(true);
    }

    const handleCloseBottomSheet = useCallback(() => {
        setIsBottomSheetOpen(false);
    }, []);

    return (
        <>
            <li className={styles.card_wrap} onClick={handleClick}>
                <div className={styles.card_image}>
                    <img src={`${baseUrl}/${props.icon}`} alt={props.icon} />
                </div>
                <div className={styles.card_content}>
                    <h4 className={styles.card_title}>{props.title}</h4>
                    <p className={styles.card_description}>{description}</p>
                </div>
            </li>

            <BottomSheet 
                isOpen={isBottomSheetOpen}
                onClose={handleCloseBottomSheet}
                data={props}
            />
        </>
    )
});

Card.displayName = 'Card';

export default Card;