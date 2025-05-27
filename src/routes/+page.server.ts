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
          <div style="max-width:480px;margin:2rem auto;padding:0;background:#fff;border-radius:18px;box-shadow:0 4px 24px 0 #2221;overflow:hidden;font-family:'GT Walsheim Pro',Arial,sans-serif;">
            <img src='https://rowdybyte.xyz/contact.png' alt='Rowdy' style="width:100%;height:120px;object-fit:cover;object-position:center;background:#2c333c;" />
            <div style="padding:2rem 2rem 1.5rem 2rem;">
              <h2 style="margin:0 0 1.5rem 0;font-size:1.5rem;font-weight:700;color:#2c333c;">Nieuw bericht via contactformulier</h2>
              <p style="margin:0 0 0.5rem 0;font-size:1rem;"><strong>Naam:</strong> <span style="color:#7c3aed">${name}</span></p>
              <p style="margin:0 0 0.5rem 0;font-size:1rem;"><strong>E-mail:</strong> <span style="color:#7c3aed">${email}</span></p>
              <div style="margin:1.5rem 0 0 0;padding:1rem;background:#f6f6f7;border-radius:10px;border:1px solid #ececec;">
                <p style="margin:0 0 0.5rem 0;font-size:1rem;"><strong>Bericht:</strong></p>
                <p style="margin:0;font-size:1rem;line-height:1.6;color:#222;">${message.replace(/\n/g, '<br/>')}</p>
              </div>
            </div>
          </div>
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
