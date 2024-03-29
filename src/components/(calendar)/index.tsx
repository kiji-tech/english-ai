'use client';
import { useContext } from 'react';
import CalendarOperation from './(calendar.operation)';
import CalendarCells from './(calendar.cells)';
import { DiaryContext } from '@/context/diary.context';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
type CorrectionCalendarProps = {
    id: string;
    name: string;
};
export default function Calendar({ id, name }: CorrectionCalendarProps) {
    const router = useRouter();
    const context = useContext(DiaryContext);
    if (!context) return <></>;

    const targetDate = context.diary.targetDate;
    return (
        <>
            <input type="hidden" id={id} name={name} value={targetDate} />
            <CalendarOperation
                onClick={(date: Date) => {
                    router.push(`/${dayjs(date).format('YYYYMMDD')}`);
                }}
                value={dayjs(targetDate).toDate()}
            />
            <CalendarCells
                onClick={(date: Date) => {
                    router.push(`/${dayjs(date).format('YYYYMMDD')}`);
                }}
                value={dayjs(targetDate).toDate()}
            />
        </>
    );
}
