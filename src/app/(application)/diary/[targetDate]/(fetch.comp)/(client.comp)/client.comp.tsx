'use client';
import styles from './client.comp.module.scss';
import DiaryWriter from '@/components/(diary.writer)';
import { saveDiary } from '@/actions/save.diary';
import { useAction } from '@/hooks/use.action';
import { Correction, Diary } from '@prisma/client';
import SubmitButton from '@/components/(submit.button)';
import { Button } from 'kiji-tech-ui-component';
import { useRouter } from 'next/navigation';
type ClientCompProps = {
    diary: Diary & { corrections: Correction[] };
};
const ClientComp = ({ diary }: ClientCompProps) => {
    const router = useRouter();
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
        await execute(data);
    };
    return (
        <>
            {/* 添削結果 */}
            <div className={styles.correctionArea}>
                {diary.corrections && diary.corrections.length != 0 ? (
                    <div className="buttonWidth">
                        <Button label={'添削結果'} radius={true} onClick={() => router.push(`/correction/${diary.targetDate}`)} />
                    </div>
                ) : null}
            </div>
            {/* 入力フォーム */}
            <form action={onSubmit} className={styles.clientComponent}>
                {/* インフォ */}
                <div className={styles.info}>
                    {/* submit */}
                    <SubmitButton />
                </div>

                {/* 日本語入力 */}
                <DiaryWriter id={'ja'} name="ja" errors={fieldErrors?.ja} initValue={diary.ja || ''} label={'日本語'} isLoading={false} />
                <div style={{ margin: '32px 0 ' }}></div>
                {/* 英語入力 */}
                <DiaryWriter id={'en'} name="en" errors={fieldErrors?.en} initValue={diary.en || ''} label={'英語'} isLoading={false} />
            </form>
        </>
    );
};
export default ClientComp;
