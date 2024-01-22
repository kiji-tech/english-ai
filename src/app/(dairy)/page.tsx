import dayjs from 'dayjs';
import { redirect } from 'next/navigation';

export default function Page() {
    redirect(`/${dayjs().format('YYYYMMDD')}`);
    return <></>;
}
