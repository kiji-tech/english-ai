'use client';
import React from 'react';
import { Correction, Dairy, Word } from '@prisma/client';

type DairyContextType = {
    dateList: Date[];
    dairy: Dairy & { corrections: Correction[]; words: Word[] };
    dairyList: (Dairy & { corrections: Correction[] })[];
    mode: string;
};
const DairyContext = React.createContext<DairyContextType | null>(null);
export { DairyContext };
export type { DairyContextType };
