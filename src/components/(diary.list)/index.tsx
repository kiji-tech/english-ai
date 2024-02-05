'use client';

import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import dayjs, { Dayjs } from 'dayjs';
import { Correction, Diary, Word } from '@prisma/client';
import { useRouter } from 'next/navigation';

type DiaryListProps = {
    diaryList: (Diary & { corrections: Correction[]; words: Word[] })[];
};

const DiaryList = ({ diaryList }: DiaryListProps) => {
    // Members   ======================================>
    const [dateList, setDateList] = useState<Dayjs[]>([]);
    const router = useRouter();

    // Functions ======================================>
    const init = () => {
        let list = [];
        // 明日から30日分の日付を作る
        for (let i = 0; i < 30; i++) {
            const d = dayjs().add(i * -1, 'day');
            list.push(d);
        }
        setDateList(list);
    };

    const searchDiary = (diaryDate: Dayjs): Diary | null => {
        return diaryList.find((d) => d.targetDate == diaryDate.format('YYYYMMDD')) || null;
    };

    const handleDiaryItem = (d: Dayjs) => {
        router.push(`/diary/${d.format('YYYYMMDD')}`);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className={styles.diaryList}>
            {dateList.map((date) => (
                <div key={date.format('YYYYMMDD')} className={styles.diaryItem} onClick={() => handleDiaryItem(date)}>
                    <div className={styles.diaryDate}>
                        <div className={styles.diaryNum}>{date.format('DD')}</div>
                        <div className={styles.diaryDay}>{date.format('ddd')}</div>
                    </div>
                    <div className={styles.diary}>{searchDiary(date) ? searchDiary(date)!.en : ''}</div>
                </div>
            ))}
        </div>
    );
};
export default DiaryList;
