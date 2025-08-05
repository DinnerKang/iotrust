export interface ServiceItem {
    id: number;
    title: string;
    icon: string;
    url?: string;
    en?: string;
    ko?: string;
    network?: string[];
    env?: ('dev' | 'stage' | 'prod')[];
    os?: ('ios' | 'android')[];
}