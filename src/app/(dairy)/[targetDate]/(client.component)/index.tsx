'use client';
import styles from './index.module.scss';
import Provider from '../provider';
import { useFormState } from 'react-dom';
import { saveDairy } from '@/actions/save.dairy';
import { DairyContextType } from '@/context/dairy.context';
import CorrectionCalendar from '@/components/(calendar)';
import DairyWriter from '@/components/(dairy.writer)';
import SubmitButton from '@/components/(submit.button)';
import CorrectionView from '@/components/(correction.view)';
import WordView from '@/components/(word.view)';
import { useAction } from '@/hooks/use.action';

type ClientComponentProps = {
    data: DairyContextType;
};
const ClientComponent = ({ data }: ClientComponentProps) => {
    const { execute, fieldErrors } = useAction(saveDairy, {
        onSuccess: () => {},
        onError: () => {},
        onComplete: () => {},
    });

    const onSubmit = async (formData: FormData) => {
        const ja = formData.get('ja') as string;
        const en = formData.get('en') as string;
        const targetDate = formData.get('selectedDate') as string;
        await execute({ ja, en, targetDate });
    };

    return (
        <Provider data={data}>
            <form action={onSubmit} className={styles.layout}>
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
                        errors={fieldErrors?.ja}
                        initValue={data.dairy.ja || ''}
                        label={'日本語'}
                        isLoading={false}
                    />
                    {/* 英語入力 */}
                    <DairyWriter
                        id={'en'}
                        name="en"
                        errors={fieldErrors?.en}
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

export default ClientComponent;
