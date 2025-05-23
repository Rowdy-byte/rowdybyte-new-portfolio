// src/lib/validators/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Vul je naam in' })
        .max(100, { message: 'Naam mag maximaal 100 tekens bevatten' }),
    email: z
        .string()
        .min(1, { message: 'Vul je e-mail in' })
        .email({ message: 'Ongeldig e-mailformaat' }),
    message: z
        .string()
        .min(1, { message: 'Vul een bericht in' })
        .max(1000, { message: 'Bericht mag niet langer zijn dan 1000 tekens' }),
});

export type ContactInput = z.infer<typeof contactSchema>;
