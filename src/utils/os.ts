
// 현재 OS 감지 함수
export const getCurrentOS = (): 'ios' | 'android' | 'other' => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod|mac|macintosh|safari/.test(userAgent)) {
        return 'ios';
    } else if (/android/.test(userAgent)) {
        return 'android';
    }
    return 'other';
};