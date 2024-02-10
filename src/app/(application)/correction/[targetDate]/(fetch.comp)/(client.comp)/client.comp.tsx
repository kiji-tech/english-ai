import CorrectionView from '@/components/(correction.view)';
import styles from './client.comp.module.scss';
import { Correction, Diary, Word } from '@prisma/client';

const ClientComp = ({ diary }: { diary: Diary & { corrections: Correction[]; words: Word[] } }) => {
    const { corrections, words } = diary;
    return (
        <>
            <div className={styles.results}>
                {corrections.map((c) => {
                    return (
                        <div className={styles.result} key={c.uid}>
                            {c.resultEn}
                        </div>
                    );
                })}
            </div>
            <div className={styles.correctionArea}>
                <div className={styles.corrections}>
                    <CorrectionView correctionList={corrections} />
                </div>
                <div className={styles.words}>
                    {words.map((w) => {
                        return (
                            <div key={w.uid}>
                                <div>
                                    {w.word} - {w.mean}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ClientComp;
