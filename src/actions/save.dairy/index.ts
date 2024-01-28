'use server';
import fs from 'fs';
import { DB } from '@/libs/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AI } from '@/libs/ai/ai';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/libs/create.safe.action';
import { SaveDairy } from './schema';
import { Correction, Word } from '@prisma/client';

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

const updateCorrection = async (dairyId: string, results: Correction[]) => {
    await DB.correction.updateMany({ where: { dairyId }, data: { deleteFlag: true } });
    for (let result of results) {
        await DB.correction.create({
            data: {
                ...result,
                dairyId,
            },
        });
    }
};
const updateWord = async (dairyId: string, results: Word[]) => {
    await DB.word.updateMany({ where: { dairyId }, data: { deleteFlag: true } });
    for (let result of results) {
        await DB.word.create({
            data: {
                ...result,
                dairyId,
            },
        });
    }
};

const handler = async (data: InputType): Promise<OutputType> => {
    // TODO authでuserIdを取得する
    const userId = 'admin';

    const { targetDate, ja, en } = data;
    const where = {
        targetDate_userId: { targetDate, userId },
    };

    try {
        const data = { en, ja, targetDate, userId };
        const dairy = await DB.dairy.upsert({ where, create: { ...data }, update: { ...data } });
        const dairyId = dairy.uid;

        // aiで添削
        const correction = await runAI(ja, en);
        console.dir(correction);
        await updateCorrection(dairyId, correction.results as Correction[]);
        await updateWord(dairyId, correction.words as Word[]);
    } catch (e) {
        console.error(e);
        return { error: 'DB save error' };
    }

    revalidatePath(`/${targetDate}`);
    redirect(`/${targetDate}`);
};
export const saveDairy = createSafeAction(SaveDairy, handler);
