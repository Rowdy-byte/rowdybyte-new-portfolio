import { db } from '$lib/server/db';
import { subscribers } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
    const token = params.token;

    const [subscriber] = await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.unsubscribeToken, token));

    if (!subscriber) {
        return {
            success: false,
            message: 'Deze afmeldlink is ongeldig of al gebruikt.'
        };
    }

    await db
        .delete(subscribers)
        .where(eq(subscribers.id, subscriber.id));

    return {
        success: true,
        email: subscriber.email
    };
}
