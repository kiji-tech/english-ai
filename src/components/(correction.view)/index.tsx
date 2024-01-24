'use client';
import { useState } from 'react';
import styles from './index.module.scss';
import { Correction } from '@prisma/client';
type CorrectionViewProps = {
    correctionList?: Correction[];
};

export default function CorrectionView({ correctionList = [] }: CorrectionViewProps) {
    const [isSpeech, setIsSpeech] = useState(false);
    const handleSpeech = (text: string) => {
        // 発言を設定
        const uttr = new SpeechSynthesisUtterance();
        uttr.text = text;
        uttr.rate = 0.9;
        uttr.lang = 'en-US';
        uttr.addEventListener('end', () => {
            console.log('end speech');
            setIsSpeech(false);
        });
        // 発言を再生
        if (!isSpeech) {
            setIsSpeech(true);
            window.speechSynthesis.speak(uttr);
        }
    };

    if (!correctionList?.length) return <div className={styles.corrections}>添削結果がありません</div>;

    return (
        <div className={styles.corrections}>
            {correctionList.map((r, index: number) => {
                return (
                    <div key={`result-${index}`} className={styles.correction}>
                        <div className={styles.en} onClick={() => handleSpeech(r.resultEn || '')}>
                            {r.resultEn}
                        </div>
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
                );
            })}
        </div>
    );
}
