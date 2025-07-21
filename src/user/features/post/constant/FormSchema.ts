import { z } from 'zod';

export const FormSchema = z.object({
  topicId: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  content: z.string().or(z.object({ ops: z.array(z.any()) })),
  tags: z.array(z.string()),
  charactersCount: z.number().min(10),
  writeDate: z.date(),
});
