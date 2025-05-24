import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) {
        throw redirect(302, '/auth/lucia/login');
    }

    const allPosts = await db.select().from(posts);

    return {
        user: locals.user,
        posts: allPosts
    };
}
