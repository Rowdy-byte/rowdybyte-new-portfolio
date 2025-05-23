// routes/blog/[slug]/+page.server.ts
import { db } from '$lib/server/db';
import { likes, comments, likesLog } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { createHash as cryptoCreateHash } from 'crypto';



function createHash(algorithm: string) {
    return {
        update: (data: string) => {
            return {
                digest: (encoding: string) => cryptoCreateHash(algorithm).update(data).digest(encoding as any)
            };
        }
    };
}

export async function load({ params, request }) {
    const slug = params.slug;

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const ipHash = createHash('sha256').update(ip).digest('hex');

    const [like] = await db.select().from(likes).where(eq(likes.slug, params.slug));

    const alreadyLiked = await db
        .select()
        .from(likesLog)
        .where(and(eq(likesLog.slug, slug), eq(likesLog.ipHash, ipHash)));

    const allComments = await db
        .select()
        .from(comments)
        .where(eq(comments.slug, params.slug))
        .orderBy(desc(comments.createdAt));

    return {
        count: like?.count ?? 0,
        comments: allComments,
        hasLiked: alreadyLiked.length > 0
    };
}

export const actions = {
    like: async ({ request, params }) => {
        const slug = params.slug;

        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const ipHash = createHash('sha256').update(ip).digest('hex');

        const alreadyLiked = await db
            .select()
            .from(likesLog)
            .where(and(eq(likesLog.slug, slug), eq(likesLog.ipHash, ipHash)));

        if (alreadyLiked.length > 0) {
            return { error: 'Je hebt al geliket vanaf dit IP-adres' };
        }

        const existing = await db.select().from(likes).where(eq(likes.slug, slug));

        if (existing.length > 0) {
            await db
                .update(likes)
                .set({ count: (existing[0]?.count ?? 0) + 1 })
                .where(eq(likes.slug, slug));
        } else {
            await db.insert(likes).values({ slug, ipHash, count: 1 });
        }

        await db.insert(likesLog).values({ slug, ipHash });

        return { success: true };
    },

    postComment: async ({ request, params }) => {
        const formData = await request.formData();
        const name = formData.get('name')?.toString().trim();
        const body = formData.get('body')?.toString().trim();
        const slug = params.slug;

        if (!name || !body) {
            return { error: 'Naam en reactie zijn verplicht.' };
        }

        await db.insert(comments).values({ name, body, slug });

        return { success: true };
    }
};






