import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Slider.module.scss';
import type { SliderData } from '@/services/banner';

interface SliderProps {
    data: SliderData[]
}

const IMAGE_URL = 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/';
const AUTO_SLIDE_INTERVAL = 8000; // 8초로 변경
const SLIDE_SPEED = 300;

export const Slider = ({ data }: SliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [animationStatus, setAnimationStatus] = useState<'prev' | 'next' | null>(null);
    const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // 자동 슬라이드 전환
    const handleNext = useCallback(() => {
        if (animationStatus !== null) return;

        setAnimationStatus('next');
        setTimeout(() => {
            setCurrentSlide(prev => (prev + 1) % data.length);
            setAnimationStatus(null);
        }, SLIDE_SPEED);
    }, [animationStatus, data.length]);

    const handlePrev = () => {
        if (animationStatus !== null) return;

        setAnimationStatus('prev');
        setTimeout(() => {
            setCurrentSlide(prev => prev === 0 ? data.length - 1 : prev - 1);
            setAnimationStatus(null);
        }, SLIDE_SPEED);
    };

    // 터치 이벤트 처리
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsHovered(true);
        if (autoSlideInterval.current) {
            clearInterval(autoSlideInterval.current);
        }
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        setIsHovered(false);
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const diff = touchStartX.current - touchEndX.current;
            if (Math.abs(diff) > 50) {
                // 100px 이상 움직였을 때만 동작
                if (diff > 0) {
                    handleNext();
                } else {
                    handlePrev();
                }
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };

    // 자동 슬라이드 관리
    useEffect(() => {
        if (!isHovered) {
            autoSlideInterval.current = setInterval(() => {
                handleNext();
            }, AUTO_SLIDE_INTERVAL);
        }

        return () => {
            if (autoSlideInterval.current) {
                clearInterval(autoSlideInterval.current);
            }
        };
    }, [isHovered, handleNext]);

    // 배너 클릭 처리
    const handleBannerClick = (item: SliderData) => {
        if (item.link) {
            window.open(item.link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <article 
            className={styles.slider_wrapper}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="배너 슬라이드"
            style={{ '--slide-speed': `${SLIDE_SPEED}ms` } as React.CSSProperties}
            tabIndex={0}
        >
            <div 
                className={styles.slide_container}
                style={{
                    width: `${data.length * 100}%`,
                    transform: `translateX(-${currentSlide * 100 / data.length}%)`,
                                         transition: animationStatus ? 'none' : 'transform 0.3s ease-in-out'
                }}
            >
                {data.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={styles.slide_item}
                        style={{ width: `${100 / data.length}%` }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={item.description || `슬라이드 ${index + 1}`}
                        aria-hidden={index !== currentSlide}
                        aria-current={index === currentSlide ? 'true' : undefined}
                    >
                        <div 
                            className={styles.banner_area}
                            onClick={() => handleBannerClick(item)}
                            role="button"
                            tabIndex={index === currentSlide ? 0 : -1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleBannerClick(item);
                                }
                            }}
                        >
                            <img 
                                src={`${IMAGE_URL}${item.img}`} 
                                alt={item.description || `슬라이드 ${index + 1}`}
                                className={styles.slide_image}
                            />
                        </div>
                        
                        {item.description && (
                            <div className={styles.description_text}>
                                {item.description}
                            </div>
                        )}
                        
                        {item.text && (
                            <div className={styles.button_area}>
                                <a 
                                    href={item.link} 
                                    className={styles.action_button}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    tabIndex={index === currentSlide ? 0 : -1}
                                    onClick={(e) => {
                                        e.stopPropagation(); // 배너 클릭 이벤트와 중복 방지
                                    }}
                                >
                                    {item.text}
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className={styles.page_indicator}>
                {currentSlide + 1} / {data.length}
            </div>
        </article>
    );
};

export default Slider;