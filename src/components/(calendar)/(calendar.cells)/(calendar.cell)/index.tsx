'use client';
import styles from './index.module.scss';
import dayjs from 'dayjs';
import { Correction } from '@prisma/client';
import { DairyContext } from '@/context/dairy.context';
import { useContext } from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CalendarCellProps = {
    date: Date;
    day: number;
    correction?: Correction;
    selected: boolean;
    isMonth: boolean;
    onClick: Function;
};

const CalendarCell = ({ date, day, selected, isMonth, onClick = (selectedDate: Date) => {} }: CalendarCellProps) => {
    const context = useContext(DairyContext);
    if (!context) return <></>;
    const { dairyList } = context;
    return (
        <div
            onClick={() => onClick(date)}
            className={`${styles.date} ${styles['day' + (day % 7)]} ${selected ? styles.selected : null} ${
                isMonth ? styles.differMonth : null
            }`}
        >
            {dayjs(date).format(`D`)}
            {dairyList?.map((d) => {
                return dayjs(d.targetDate).isSame(dayjs(date)) ? (
                    <div key={`dairy-${d.targetDate}`} className={styles.layout}>
                        <FontAwesomeIcon icon={faBook} className={styles.correctionIcon} />
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default CalendarCell;
