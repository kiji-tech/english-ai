'use client';
import styles from './index.module.scss';
import Provider from '../../provider';
import { useFormState } from 'react-dom';
import { State, saveDairy } from '@/actions/save.dairy';
import { DairyContextType } from '@/context/dairy.context';
import CorrectionCalendar from './(correction.calendar)';
import DairyWriter from './(dairy.writer)';
import SubmitButton from './(submit.button)';
import CorrectionView from './(correction.view)';
import WordView from './(word.view)';

type DairyFormProps = {
    data: DairyContextType;
};
const DairyForm = ({ data }: DairyFormProps) => {
    const initialMessage: State = { errors: {}, message: null };
    const [state, dispatch] = useFormState(saveDairy, initialMessage);
    return (
        <Provider data={data}>
            <form action={dispatch} className={styles.layout}>
                <div className={`${styles.section} ${styles.calendar}`}>
                    {/* カレンダー */}
                    <CorrectionCalendar id="selectedDate" name="selectedDate" />
                    <div className={styles.space}>
                        {/* 保存ボタン */}
                        <SubmitButton />
                    </div>
                </div>
                <div className={`${styles.section} ${styles.dairy}`}>
                    {/* 日本語入力 */}
                    <DairyWriter
                        id={'ja'}
                        name="ja"
                        errors={state?.errors?.ja}
                        initValue={data.dairy.ja || ''}
                        label={'日本語'}
                        isLoading={false}
                    />
                    {/* 英語入力 */}
                    <DairyWriter
                        id={'en'}
                        name="en"
                        errors={state?.errors?.en}
                        initValue={data.dairy.en || ''}
                        label={'英語'}
                        isLoading={false}
                    />
                </div>
                <div className={`${styles.section} ${styles.right}`}>
                    <div className={styles.correctionView}>
                        <CorrectionView correctionList={data.dairy.corrections} />
                    </div>
                    <div className={styles.wordView}>
                        <WordView />
                    </div>
                </div>
            </form>
        </Provider>
    );
};

export default DairyForm;
