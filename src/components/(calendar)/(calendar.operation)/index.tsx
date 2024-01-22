'use client';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { Button } from 'kiji-tech-ui-component';
import { DairyContext } from '@/context/dairy.context';

type CalendarOperationProps = {
    value: Date;
    onClick?: Function;
};

export default function CalendarOperation({ value, onClick = (selectedDate: Date) => {} }: CalendarOperationProps) {
    const context = useContext(DairyContext);
    if (!context) return <></>;
    const mode = context.mode;

    const handleChange = (v: number) => {
        if (mode == 'month') {
            onClick(dayjs(value).add(v, 'month').toDate());
        } else {
            onClick(dayjs(value).add(v, 'week').toDate());
        }
    };
    const handleToday = () => {
        onClick(dayjs(new Date()).toDate());
    };

    return (
        <div className={'buttonGroup'}>
            {/* Prev */}
            <div className={'buttonWidth'}>
                <Button
                    label={mode == 'month' ? dayjs(value).add(-1, 'month').format('M月') : 'PREV'}
                    onClick={() => handleChange(-1)}
                    color="clear"
                />
            </div>
            {/* Today */}
            <div className={'buttonWidth'}>
                <Button label={mode == 'month' ? dayjs(value).format('YYYY年M月') : 'TODAY'} onClick={() => handleToday()} color="clear" />
            </div>
            {/* Next */}
            <div className={'buttonWidth'}>
                <Button
                    type="button"
                    label={mode == 'month' ? dayjs(value).add(1, 'month').format('M月') : 'NEXT'}
                    onClick={() => handleChange(1)}
                    color="clear"
                />
            </div>
        </div>
    );
}
