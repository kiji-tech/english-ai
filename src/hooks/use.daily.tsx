import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

const useDaily = (targetDate: Date) => {
    const [daily, setDaily] = useState();

    const fetchDaily = async () => {
        const params = { targetDate: dayjs(targetDate).format('YYYYMMDD') };
        const query = new URLSearchParams(params);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/dairy?${query}`);
        if (!res.ok) throw 'not found';
        const data = await res.json();
        setDaily(data);
    };

    useEffect(() => {
        fetchDaily();
        return () => {};
    }, []);

    return [daily];
};

export { useDaily };
