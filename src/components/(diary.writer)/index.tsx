'use client';

import styles from './index.module.scss';
import { useState } from 'react';
import { Textarea } from 'kiji-tech-ui-component';
import ErrorMessage from '@/components/(error.message)';

type DiaryProps = {
    id: string;
    name: string;
    initValue: string;
    label: string;
    errors?: string[];
    isLoading: boolean;
};

const MAX_LENGTH = 2000;

export default function DiaryWriter({ name, initValue, id, label, errors = [], isLoading = false }: DiaryProps) {
    const [value, setValue] = useState(initValue);
    return (
        <div className={styles.layout}>
            <Textarea
                id={id}
                name={name}
                value={value}
                onChange={(e: string) => setValue(e)}
                disabled={isLoading}
                length={MAX_LENGTH}
                label={label}
                required
                radius={true}
            />
            {errors.map((m) => {
                return <ErrorMessage key={m} message={m} />;
            })}
        </div>
    );
}
