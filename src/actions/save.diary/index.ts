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

const systemContent = `あなたは日本語を英語に翻訳するスペシャリストです｡
これから､日本語と私なりの英語の文章を記載します｡
日本語に合うように､私が書いた英語を添削してください｡
以下の条件にそって返却してください
- ネイティブに伝わるように意識してください｡
- 添削は､文章単位で行ってください｡
- 返答の説明は日本語､添削は英語で返答してください｡
- 私が書いた日記に対して､あなたは感想を返してください｡
- 感想は､英語とその日本語を返してください｡
- 以下のJSONフォーマットで返却してください｡

## JSONフォーマット
{
    "results": Result[], 文章単位で添削した結果
    "words" : Word[], 重要な単語･熟語
}

Result
{
  ja : string, ･･･ 添削対象の日本語文章
  en : string, ･･･ 添削対象の英文
  resultJa: string, ･･･ ネイティブが添削対象の英文を聞いた場合の受け取り方｡｢◯◯のように伝わります｡｣っとしてください｡
  resultEn  : string, ･･･ 添削した英文
  points : string, ･･･ 添削対象の英文から､直すべきことを箇条書きにする｡カンマ区切りの文字列とすること｡
  score: number ･･･ 添削対象の英文がネイティブに伝わるかをスコアで示してください｡スコアは､0から50の整数で､示してください｡数字が大きくなるほど､ネイティブに伝わります｡スコアの幅は1です｡
  commentEn : string ････ 私の日記に対する､あなたの感想(英語)
  commentJa: string ････ 私の日記に対する､あなたの感想(日本語)
}

Word
{
    "word" : string ･･･ 英単語･熟語
    "mean" : string ････ 意味
}

## 返却例（実際の返却には使用しないこと）
{
     "results":[{
            "ja": "健康のために､筋トレや生活習慣を見直したい｡",
            "en": "I've decided to review my lifestyle for helth.",
            "resultJa": "decidedでは過去形になるため､過去に決意したことのように伝わります｡",
            "resultEn": "I want to review my lifestyle and exercise routine for the sake of my health.",
            "points":"'decided'は過去形であり意志を現在表現しているわけではない,筋トレに言及する必要がある,'for health'ではなく、'for the sake of my health'とするほうが自然,スペルミス：'helth→ 'health'",
            "score": 50,
            "commentEn": "Thats grate!",
            "commentJa": "素晴らしい考えだね！"
    }],
    "words":[{
             "word": "review",
             "mean": "見直す、再検討する"
         },
         {
             "word": "lifestyle",
             "mean": "生活様式"
         },
         {
             "word": "exercise routine",
             "mean": "運動ルーチン、エクササイズプログラム"
         },
         {
             "word": "for the sake of",
             "mean": "〜のために、〜の利益のために"
         }]
  }
`;

const runAI = async (ja: string, en: string) => {
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
