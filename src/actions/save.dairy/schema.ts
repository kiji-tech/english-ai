import { z } from 'zod';
const MAX_LENGTH = 2000;

export const SaveDairy = z.object({
    targetDate: z.string(),
    ja: z.string().min(1, { message: '日本語の文字数が少ないです' }).max(MAX_LENGTH, {
        message: '日本語の文字数が多いです',
    }),
    en: z.string().min(1, { message: '英語の文字数が少ないです' }).max(MAX_LENGTH, {
        message: '英語の日記の文字数が多いです',
    }),
});
