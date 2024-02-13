import CorrectionView from '@/components/(correction.view)';
import styles from './client.comp.module.scss';
import { Correction, Diary, Word } from '@prisma/client';
import WordView from '@/components/(word.view)';

const ClientComp = ({ diary }: { diary: Diary & { corrections: Correction[]; words: Word[] } }) => {
    const { corrections, words } = diary;
    return (
        <>
            <div className={styles.results}>
                {corrections.map((c) => {
                    return (
                        <div key={c.uid}>
                            <div className={styles.diary}>{c.resultEn}</div>
                            <div className={styles.comment}>{c.commentEn}</div>
                        </div>
                    );
                })}
            </div>
            <div className="bar" />
            <div className={styles.correctionArea}>
                <div className={styles.corrections}>
                    <CorrectionView correctionList={corrections} />
                </div>
                <div className={styles.words}>
                    <WordView words={words} />
                </div>
            </div>
        </>
    );
};

export default ClientComp;
