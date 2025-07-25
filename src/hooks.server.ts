import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';

export const handle: Handle = async ({ event, resolve }) => {
	const url = event.url;

	// Force redirect from non-www to www for production
	if (url.hostname === 'rowdybyte.xyz') {
		return new Response(null, {
			status: 301,
			headers: {
				location: `https://www.rowdybyte.xyz${url.pathname}${url.search}`
			}
		});
	}

	// Handle auth after redirect check
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
