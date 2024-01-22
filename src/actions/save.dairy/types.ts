import { z } from 'zod';
import { SaveDairy } from './schema';
import { Correction, Dairy } from '@prisma/client';
import { ActionState } from '@/libs/create.safe.action';

export type InputType = z.infer<typeof SaveDairy>;
export type OutputType = ActionState<InputType, Dairy & { corrections: Correction[] }>;
