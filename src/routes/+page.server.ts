import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { contactSchema, type ContactInput } from '$lib/validators/contact';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const raw = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        const result = contactSchema.safeParse(raw);
        if (!result.success) {
            const { fieldErrors } = result.error.flatten();
            return fail(400, { data: raw, errors: fieldErrors });
        }

        const { name, email, message }: ContactInput = result.data;

        try {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: 'rowdy.verbeek@outlook.com',
                subject: `Nieuw contactbericht van ${name}`,
                html: `
          <h2>Nieuw bericht via contactformulier</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Bericht:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `
            });
        } catch (err) {
            console.error('Resend error:', err);
            return fail(500, {
                data: raw,
                errors: { message: ['Er ging iets mis bij het verzenden, probeer later opnieuw.'] }
            });
        }

        return { success: true };
    }
};
