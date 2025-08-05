
export interface SliderItem {
    id: number;
    ko: SliderData;
    en: SliderData;
}

export interface SliderData {
    id?: number;
    img: string;
    link: string;
    description?: string;
    text?: string;
}
