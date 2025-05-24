import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import matter from 'gray-matter';
import { marked } from 'marked';

// ✅ Markdown als string inladen
const all = import.meta.glob('/src/content/posts/*.md', {
	as: 'raw',
	import: 'default',
	eager: true
});

export async function POST() {
	let inserted = 0;

	for (const [path, raw] of Object.entries(all)) {
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';
		const { content, data: metadata } = matter(raw as string);
		const html = await marked(content);

		const existing = await db.select().from(posts).where(eq(posts.slug, slug));

		if (existing.length === 0) {
			await db.insert(posts).values({
				slug,
				title: metadata.title ?? slug,
				body: html,
				coverImage: metadata.coverImage ?? null,
				description: metadata.description ?? null,
				mailed: false
			});
			inserted++;
		}
	}

	return json({ success: true, inserted });
}
