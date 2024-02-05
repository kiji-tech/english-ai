import DiaryList from '@/components/(diary.list)';
import { DB } from '@/libs/db/prisma';

const Home = async () => {
    const diaryList =
        (await DB.diary.findMany({
            where: { userId: 'admin' },
            orderBy: { targetDate: 'desc' },
            include: { corrections: true, words: true },
            take: 30,
        })) || [];

    // 日記一覧の取得
    // リストの作成
    // infinity scrollの作成

    return (
        <>
            <DiaryList diaryList={diaryList} />
        </>
    );
};

export default Home;
