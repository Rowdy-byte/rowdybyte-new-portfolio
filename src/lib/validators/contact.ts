// src/lib/validators/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be atleast 2 characters' })
        .max(20, { message: 'Name can be max 20 characters' }),
    email: z
        .string()
        .min(5, { message: 'Enter e-mail' })
        .email({ message: 'Invalid e-mail format' }),
    message: z
        .string()
        .min(10, { message: 'Enter a message' })
        .max(100, { message: 'Message can be max 100 characters' }),
});

export type ContactInput = z.infer<typeof contactSchema>;
