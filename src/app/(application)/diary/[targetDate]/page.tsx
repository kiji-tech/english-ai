import dayjs from 'dayjs';
import { Suspense } from 'react';
import FetchComp from './(fetch.comp)/fetch.comp';

type DiaryPageProps = {
    params: {
        targetDate: string;
    };
};

const DiaryPage = ({ params }: DiaryPageProps) => {
    const targetDate = params.targetDate || dayjs().format('YYYYMMDD');

    return (
        <>
            <Suspense fallback={<FetchComp.SKELETON />}>
                <FetchComp targetDate={targetDate} />
            </Suspense>
        </>
    );
};
export default DiaryPage;


