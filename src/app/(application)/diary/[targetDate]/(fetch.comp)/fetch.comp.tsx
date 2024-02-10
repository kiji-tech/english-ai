import styles from './fetch.comp.module.scss';
import { DB } from '@/libs/db/prisma';
import { Correction, Diary, Word } from '@prisma/client';
import ClientComp from './(client.comp)/client.comp';
import Skeleton from '@/components/(skeleton)/skeleton';
type FetchCompProps = {
    targetDate: string;
};

const timer = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(null), ms));

const FetchComp = async ({ targetDate }: FetchCompProps) => {
    const diary =
        (await DB.diary.findUnique({
            where: { targetDate_userId: { targetDate, userId: 'admin' } },
            include: { corrections: { where: { deleteFlag: false } }, words: { where: { deleteFlag: false } } },
        })) || ({ ja: '', en: '', targetDate } as Diary & { corrections: Correction[]; words: Word[] });
    return <ClientComp diary={diary} />;
};

FetchComp.SKELETON = function skeleton() {
    return (
        <>
            <div style={{ width: '100%', height: '80px', margin: '8px' }}>
                <Skeleton />
            </div>
            <div style={{ width: '100%', height: '160px', margin: '8px' }}>
                <Skeleton />
            </div>
            <div style={{ width: '100%', height: '160px', margin: '8px' }}>
                <Skeleton />
            </div>
        </>
    );
};
export default FetchComp;
