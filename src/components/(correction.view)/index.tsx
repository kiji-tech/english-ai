'use client';
import { useState } from 'react';
import styles from './index.module.scss';
import { Correction } from '@prisma/client';
import AudioButton from '../(audio.button)/audio.button';
type CorrectionViewProps = {
    correctionList?: Correction[];
};

export default function CorrectionView({ correctionList = [] }: CorrectionViewProps) {
    if (!correctionList?.length) return <div className={styles.corrections}>添削結果がありません.</div>;

    return (
        <div className={styles.corrections}>
            {correctionList.map((r, index: number) => {
                return (
                    <div key={`result-${index}`} className={styles.correction}>
                        <div className={styles.en}>
                            <div className={styles.enText}>{r.resultEn}</div>
                            <AudioButton text={r.resultEn!} />
                        </div>
                        <div className={styles.body}>
                            <div className={styles.writeJa}>{r.ja}</div>
                            あなたが書いた英文：
                            <div className={styles.writeEn}>{r.en}</div>
                            指摘事項：
                            <div className={styles.points}>
                                {r.points?.split(',').map((p, j: number) => {
                                    return <div key={`point-${index}-${j}`}>・{p}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
