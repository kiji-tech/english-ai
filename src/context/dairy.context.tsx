'use client';
import React from 'react';
import { Correction, Dairy } from '@prisma/client';

type DairyContextType = {
    dateList: Date[];
    dairy: Dairy & { corrections: Correction[] };
    dairyList: (Dairy & { corrections: Correction[] })[];
    mode: string;
};
const DairyContext = React.createContext<DairyContextType | null>(null);
export { DairyContext };
export type { DairyContextType };
