import { z } from 'zod';
import { SaveDiary } from './schema';
import { Correction, Diary } from '@prisma/client';
import { ActionState } from '@/utils/create.safe.action';

export type InputType = z.infer<typeof SaveDiary>;
export type OutputType = ActionState<InputType, Diary & { corrections: Correction[] }>;
