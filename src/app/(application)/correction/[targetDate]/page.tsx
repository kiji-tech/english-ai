import { Suspense } from 'react';
import FetchComp from './(fetch.comp)/fetch.comp';

type CorrectionPageProps = {
    params: {
        targetDate: string;
    };
};

const CorrectionPage = async ({ params }: CorrectionPageProps) => {
    const { targetDate } = params;
    const userId = 'admin';
    return (
        <Suspense fallback={<FetchComp.SKELETON />}>
            <FetchComp targetDate={targetDate} userId={userId} />
        </Suspense>
    );
};
export default CorrectionPage;
