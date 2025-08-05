
// 현재 환경 확인
export const getCurrentEnv = (): 'dev' | 'stage' | 'prod' => {
    const mode = import.meta.env.MODE;
    if (mode === 'development' || mode === 'dev') return 'dev';
    if (mode === 'stage') return 'stage';
    if (mode === 'production' || mode === 'prod') return 'prod';
    return 'dev'; // 기본값
};