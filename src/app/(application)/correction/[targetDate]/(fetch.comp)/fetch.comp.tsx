import { DB } from '@/libs/db/prisma';
import ClientComp from './(client.comp)/client.comp';
import { Diary, Correction, Word } from '@prisma/client';
import Skeleton from '@/components/(skeleton)/skeleton';

const FetchComp = async ({ targetDate, userId }: { targetDate: string; userId: string }) => {
    const diary = (await DB.diary.findUnique({
        where: { targetDate_userId: { targetDate, userId } },
        include: { corrections: { where: { deleteFlag: false } }, words: { where: { deleteFlag: false } } },
    })) as Diary & { corrections: Correction[]; words: Word[] };
    return <ClientComp diary={diary} />;
};

FetchComp.SKELETON = () => {
    return (
        <>
            <div style={{ width: '100%', height: '300px' }}>
                <Skeleton />
            </div>
            <div style={{ width: '100%', height: '300px' }}>
                <Skeleton />
            </div>
        </>
    );
};

export default FetchComp;
