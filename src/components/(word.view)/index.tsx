'use client';
import AudioButton from '../(audio.button)/audio.button';
import styles from './index.module.scss';
import { Word } from '@prisma/client';

type WordViewProps = {
    words: Word[];
};
export default function WordView({ words = [] }: WordViewProps) {
    return (
        <div className={styles.words}>
            {words.map((w) => {
                return (
                    <div key={w.word} className={styles.word}>
                        <div className={styles.head}>
                            <div className={styles.text}>{w.word}</div>
                            <AudioButton text={w.word} />
                        </div>
                        <span className={styles.mean}>{w.mean}</span>
                    </div>
                );
            })}
        </div>
    );
}
