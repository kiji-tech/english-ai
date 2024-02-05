'use client';
import styles from './diary.writer.module.scss';

type DiaryWriterProps = {
    id: string;
    text: string;
    label: string;
};
const DiaryWriter = async ({ text, id, label }: DiaryWriterProps) => {
    return (
        <div className={styles.diaryWriter}>
            <div className={styles.diaryLabel}>{label}</div>
            <textarea id={id} className={styles.diaryTextAre} value={text} />
        </div>
    );
};

export default DiaryWriter;
