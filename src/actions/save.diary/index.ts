'use server';
import fs from 'fs';
import path from 'path';
import { DB } from '@/utils/db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AI } from '@/utils/ai/ai';
import { InputType, OutputType } from './types';
import { createSafeAction } from '@/utils/create.safe.action';
import { SaveDiary } from './schema';
import { Correction, Word } from '@prisma/client';

const runAI = async (ja: string, en: string) => {
    const systemContent = await fs.readFileSync(path.join(process.cwd(), 'public', 'ai.contents', 'system.content.txt'), {
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

const updateCorrection = async (diaryId: string, results: Correction[]) => {
    await DB.correction.updateMany({ where: { diaryId }, data: { deleteFlag: true } });
    for (let result of results) {
        await DB.correction.create({
            data: {
                ...result,
                diaryId,
            },
        });
    }
};

const updateWord = async (diaryId: string, results: Word[]) => {
    await DB.word.updateMany({ where: { diaryId }, data: { deleteFlag: true } });
    for (let result of results) {
        await DB.word.create({
            data: {
                ...result,
                diaryId,
            },
        });
    }
};

const handler = async (data: InputType): Promise<OutputType> => {
    console.log('save diary.');
    // TODO authでuserIdを取得する
    const userId = 'admin';

    const { targetDate, ja, en } = data;
    const where = {
        targetDate_userId: { targetDate, userId },
    };

    try {
        const data = { en, ja, targetDate, userId };
        const diary = await DB.diary.upsert({ where, create: { ...data }, update: { ...data } });
        const diaryId = diary.uid;

        // aiで添削
        const correction = await runAI(ja, en);
        await updateCorrection(diaryId, correction.results as Correction[]);
        await updateWord(diaryId, correction.words as Word[]);
    } catch (e) {
        console.error(e);
        return { error: 'DB save error' };
    }

    // revalidatePath(`/${targetDate}`);
    redirect(`/home`);
};
export const saveDiary = createSafeAction(SaveDiary, handler);
