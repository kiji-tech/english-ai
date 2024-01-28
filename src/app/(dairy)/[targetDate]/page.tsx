import styles from './page.module.scss';
import dayjs from 'dayjs';
import { DB } from '@/libs/db/prisma';
import { Correction, Dairy, Word } from '@prisma/client';
import Calendar from './(client.component)';
import ClientComponent from './(client.component)';

const Page = async ({ params }: { params: { targetDate: string } }) => {
    const targetDate = params.targetDate || dayjs(new Date()).format('YYYYMMDD');
    // dairy
    const initDairy = { ja: '', en: '', targetDate, corrections: [], words: [] } as unknown as Dairy & {
        corrections: Correction[];
        words: Word[];
    };
    const dairy =
        (await DB.dairy.findUnique({
            where: { targetDate_userId: { targetDate, userId: 'admin' } },
            include: { corrections: { where: { deleteFlag: false } }, words: { where: { deleteFlag: false } } },
        })) || initDairy;

    // date list
    let dateList = [];
    let mode = 'month';
    const startDay = 0;

    let endDay = startDay - 1;
    if (endDay < 0) endDay = 6;
    let startDate = dayjs(targetDate).toDate();
    let endDate = dayjs(startDate).toDate();

    if (mode == 'month') {
        startDate.setDate(1);
        endDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
    } else {
        startDate = dayjs(startDate)
            .add(startDay - startDate.getDay(), 'day')
            .toDate();
        endDate = dayjs(endDate)
            .add(endDay - endDate.getDay(), 'day')
            .toDate();
    }

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        dateList.push(new Date(date));
    }

    if (startDate.getDay() != startDay) {
        let addDate = new Date(startDate);
        for (let i = addDate.getDay(); i > startDay; i--) {
            addDate.setDate(addDate.getDate() - 1);
            dateList.unshift(new Date(addDate));
        }
    }

    if (endDate.getDay() != endDay) {
        let addDate = new Date(endDate);
        for (let i = addDate.getDay(); i < endDay; i++) {
            addDate.setDate(addDate.getDate() + 1);
            dateList.push(new Date(addDate));
        }
    }

    const dairyList = await DB.dairy.findMany({
        where: { targetDate: { gte: dayjs(startDate).format('YYYYMMDD'), lte: dayjs(endDate).format('YYYYMMDD') }, userId: 'admin' },
        include: { corrections: { where: { deleteFlag: false } } },
    });
    const data = { dairy, dairyList, dateList, mode };

    return <ClientComponent data={data} />;
};

export default Page;
