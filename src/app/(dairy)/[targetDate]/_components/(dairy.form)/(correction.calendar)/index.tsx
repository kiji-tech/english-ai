'use client';
import { useContext } from 'react';
import CalendarOperation from './(calendar.operation)';
import CalendarCells from './(calendar.cells)';
import { DairyContext } from '@/context/dairy.context';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
type CorrectionCalendarProps = {
    id: string;
    name: string;
};
export default function CorrectionCalendar({ id, name }: CorrectionCalendarProps) {
    const router = useRouter();
    const context = useContext(DairyContext);
    if (!context) return <></>;

    const targetDate = context.dairy.targetDate;
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
