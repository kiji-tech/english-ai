'use client';
import React from 'react';
import { Correction, Diary, Word } from '@prisma/client';

type DiaryContextType = {
    dateList: Date[];
    diary: Diary & { corrections: Correction[]; words: Word[] };
    diaryList: (Diary & { corrections: Correction[] })[];
    mode: string;
};
const DiaryContext = React.createContext<DiaryContextType | null>(null);
export { DiaryContext };
export type { DiaryContextType };
