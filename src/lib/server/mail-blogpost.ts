import { db } from '$lib/server/db';
import { posts, subscribers } from '$lib/server/db/schema';
import { Resend } from 'resend';
import { eq } from 'drizzle-orm';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function mailNewBlogPost(postId: number) {
	const [post] = await db.select().from(posts).where(eq(posts.id, postId));
	if (!post) throw new Error('Post niet gevonden');

	if (post.mailed) {
		console.log('⛔ Deze post is al gemaild.');
		return;
	}

	const allSubscribers = await db.select().from(subscribers);
	const blogUrl = `https://rowdybyte.xyz/blog/${post.slug}`;
	const coverImage = post.coverImage
		? `https://rowdybyte.xyz${post.coverImage.startsWith('/') ? post.coverImage : `/${post.coverImage}`}`
		: 'https://rowdybyte.xyz/images/default-cover.jpg';

	const description = post.description ?? 'Klik hieronder om verder te lezen!';

	console.log('📨 Start mailing...');
	console.log('📝 post:', post);
	console.log('🖼️ coverImage:', coverImage);
	console.log('🧾 description:', description);
	console.log('📩 subscribers:', allSubscribers);

	await Promise.all(
		allSubscribers.map(async (sub) => {
			try {
				const unsubscribeLink = `https://rowdybyte.xyz/unsubscribe/${sub.unsubscribeToken}`;
				console.log(`📬 Verstuur naar ${sub.email} met link ${unsubscribeLink}`);

				await resend.emails.send({
					from: 'onboarding@resend.dev',
					to: sub.email,
					subject: `Nieuwe blogpost: ${post.title}`,
					html: generateEmailHtml(post.title, coverImage, description, blogUrl, unsubscribeLink)
				});
			} catch (err) {
				console.error(`❌ Fout bij mail naar ${sub.email}:`, err);
			}
		})
	);

	await db.update(posts).set({ mailed: true }).where(eq(posts.id, postId));

	console.log(`✅ Mail verstuurd naar ${allSubscribers.length} subscribers.`);
}

function generateEmailHtml(
	title: string,
	coverImage: string,
	description: string,
	blogUrl: string,
	unsubscribeLink: string
) {
	return `
		<div style="font-family: system-ui, sans-serif; background: #f9f9f9; padding: 2rem;">
			<div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
				<img src="${coverImage}" alt="${title}" style="width: 100%; max-width: 100%; height: auto;" />
				<div style="padding: 2rem;">
					<h1 style="margin-top: 0; color: #7c3aed;">${title}</h1>
					<p style="color: #333;">Hoi, er is een nieuwe blogpost verschenen op <strong>rowdybyte.xyz</strong>:</p>
					<p style="color: #666; font-size: 14px; line-height: 1.5;">${description}</p>
					<a href="${blogUrl}" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 6px;">
						👉 Lees de blog
					</a>
				</div>
				<div style="background: #f3f3f3; padding: 1rem; text-align: center; font-size: 12px; color: #999;">
					Je ontvangt deze mail omdat je je hebt ingeschreven op rowdybyte.xyz.<br />
					Geen interesse meer? <a href="${unsubscribeLink}">Klik hier om je uit te schrijven</a>.
				</div>
			</div>
		</div>
	`;
}
