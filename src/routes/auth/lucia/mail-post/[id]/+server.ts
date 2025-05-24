import { mailNewBlogPost } from '$lib/server/mail-blogpost';
import { json, redirect } from '@sveltejs/kit';

export async function POST({ params, locals }) {
    if (!locals.user) {
        throw redirect(302, '/auth/lucia/login');
    }

    const postId = Number(params.id);

    try {
        await mailNewBlogPost(postId);
        return json({ success: true });
    } catch (err) {
        console.error('❌ Mislukt om te mailen:', err);
        return json({ error: 'Er ging iets mis met mailen' }, { status: 500 });
    }
}

