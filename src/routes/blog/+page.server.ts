import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';



export const actions = {
    subscribe: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email')?.toString().trim().toLowerCase();

        if (!email || !email.includes('@')) {
            return fail(400, { error: '📬 Vul een geldig e-mailadres in.' });
        }

        // Check of al bestaat
        const existing = await db.select().from(subscribers).where(eq(subscribers.email, email));

        if (existing.length > 0) {
            return fail(400, { error: 'Dit e-mailadres is al geregistreerd.' });
        }

        await db.insert(subscribers).values({ email });

        return { success: true };
    }
};
