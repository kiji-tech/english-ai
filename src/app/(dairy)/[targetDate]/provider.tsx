import React from 'react';
import { DairyContext, DairyContextType } from '@/context/dairy.context';

interface ProviderProps {
    children: React.ReactNode;
    data: DairyContextType;
}

export default function Provider({ children, data }: ProviderProps) {
    return <DairyContext.Provider value={{ ...data }}>{children}</DairyContext.Provider>;
}
