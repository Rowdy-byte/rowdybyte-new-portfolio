import { subscribers, user } from "$lib/server/db/schema";
import type { PageServerLoad } from "../$types";
import { db } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/auth/lucia/login');
    }

    const allSubscriber = await db
        .select()
        .from(subscribers)

    return { allSubscriber, user: locals.user };
};