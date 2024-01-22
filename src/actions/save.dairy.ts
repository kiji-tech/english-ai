'use server';
import fs from 'fs';
import { DB } from '@/libs/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { AI } from '@/libs/ai/ai';

const MAX_LENGTH = 2000;

const SaveDairy = z.object({
    ja: z.string().min(1, { message: '日本語の文字数が少ないです' }).max(MAX_LENGTH, {
        message: '日本語の文字数が多いです',
    }),
    en: z.string().min(1, { message: '英語の文字数が少ないです' }).max(MAX_LENGTH, {
        message: '英語の日記の文字数が多いです',
    }),
    targetDate: z.string(),
});

export type State = {
    errors?: {
        ja?: string[];
        en?: string[];
    };
    message?: string | null;
};

const runAI = async (ja: string, en: string) => {
    const systemContent = await fs.readFileSync(process.env.NEXT_PUBLIC_OPEN_AI_SYSTEM_CONTENT_PATH!, {
        encoding: 'utf-8',
    });
    const userContent = `
## 日本語
${ja}

## 英語
${en}
`;
    const aiResult = await AI.getInstance().run(systemContent, userContent);
    return aiResult;
};

export const saveDairy = async (prevState: State, formData: FormData) => {
    const validated = SaveDairy.safeParse({
        ja: formData.get('ja'),
        en: formData.get('en'),
        targetDate: formData.get('selectedDate'),
    });

    if (!validated.success) {
        return { errors: validated.error.flatten().fieldErrors, message: '入力エラー' };
    }
    const { targetDate, ja, en } = validated.data;

    const where = {
        targetDate_userId: { targetDate, userId: 'admin' },
    };

    try {
        const data = { en, ja, targetDate, userId: 'admin' };
        const dairy = await DB.dairy.upsert({ where, create: { ...data }, update: { ...data } });
        const dairyId = dairy.uid;

        // aiで添削
        const correction = await runAI(ja, en);
        // 過去の添削はすべて削除
        await DB.correction.updateMany({ where: { dairyId }, data: { deleteFlag: true } });
        for (let result of correction.results) {
            await DB.correction.create({
                data: {
                    dairyId,
                    ...result,
                },
            });
        }
    } catch (e) {
        console.error(e);
        return { message: 'DB save error' };
    }

    revalidatePath(`/${targetDate}`);
    redirect(`/${targetDate}`);
};
