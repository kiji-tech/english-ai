'use client';
import styles from './client.comp.module.scss';
import DiaryWriter from '@/components/(diary.writer)';
import { saveDiary } from '@/actions/save.diary';
import { useAction } from '@/hooks/use.action';
import { Diary } from '@prisma/client';
import SubmitButton from '@/components/(submit.button)';
import Skeleton from '@/components/(skeleton)/skeleton';
type ClientCompProps = {
    diary: Diary;
};
const ClientComp = ({ diary }: ClientCompProps) => {
    const { execute, fieldErrors } = useAction(saveDiary, {
        onSuccess: (result) => {
            console.log('success');
            console.dir(result);
        },
        onError: (e) => {
            console.error(e);
        },
        onComplete: () => {
            console.log('complete');
        },
    });

    const onSubmit = async (formData: FormData) => {
        const ja = formData.get('ja') as string;
        const en = formData.get('en') as string;
        const data = { ja, en, targetDate: diary.targetDate };
        console.dir(data);
        await execute(data);
    };
    return (
        <form action={onSubmit} className={styles.clientComponent}>
            {/* インフォ */}
            <div className={styles.info}>
                {/* submit */}
                <SubmitButton />
            </div>

            {/* 日本語入力 */}
            <DiaryWriter id={'ja'} name="ja" errors={fieldErrors?.ja} initValue={diary.ja || ''} label={'日本語'} isLoading={false} />
            {/* 英語入力 */}
            <DiaryWriter id={'en'} name="en" errors={fieldErrors?.en} initValue={diary.en || ''} label={'英語'} isLoading={false} />
        </form>
    );
};
export default ClientComp;
