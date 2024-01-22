'use client';

import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/navigation';
import { Correction } from '@prisma/client';
import CalendarCell from './(calendar.cell)';
import { DairyContext } from '@/context/dairy.context';
type CalendarCellsProps = {
    value: Date;
    startDay?: number;
    onClick?: Function;
};
const dayStrList = ['日', '月', '火', '水', '木', '金', '土'];

export default function CalendarCells({ value, startDay = 0, onClick = (selectedDate: Date) => {} }: CalendarCellsProps) {
    const context = useContext(DairyContext);
    if (!context) return <></>;

    return (
        <div className={styles.calendar}>
            <div className={styles.weekly}>
                {/* 曜日ヘッダー */}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                    return (
                        <div key={`day-${i}`} className={`${styles.day} ${styles['day' + ((startDay + i) % 7)]}`}>
                            {dayStrList[(startDay + i) % 7]}
                        </div>
                    );
                })}
                {/* 日付 */}
                {context.dateList.map((d, index) => {
                    return (
                        <CalendarCell
                            key={index}
                            date={d}
                            day={index}
                            selected={d.toLocaleDateString() == value.toLocaleDateString()}
                            isMonth={d.getMonth() != value.getMonth()}
                            onClick={onClick}
                        />
                    );
                })}
            </div>
        </div>
    );
}
