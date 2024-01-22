'use client';

import styles from './index.module.scss';
import { useState } from 'react';
import { Textarea } from 'kiji-tech-ui-component';
import ErrorMessage from './(error.message)';

type DairyProps = {
    id: string;
    name: string;
    initValue: string;
    label: string;
    errors?: string[];
    isLoading: boolean;
};

const MAX_LENGTH = 2000;

export default function DairyWriter({ name, initValue, id, label, errors = [], isLoading = false }: DairyProps) {
    const [value, setValue] = useState(initValue);
    return (
        <div className={styles.layout}>
            <Textarea
                id={id}
                name={name}
                value={value}
                onChange={(e: string) => setValue(e)}
                height={320}
                disabled={isLoading}
                length={MAX_LENGTH}
                label={label}
                required
            />
            {errors.map((m) => {
                return <ErrorMessage key={m} message={m} />;
            })}
        </div>
    );
}
