import { pgTable, serial, text, integer, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const likes = pgTable('likes', {
	slug: text('slug').primaryKey(),
	ipHash: text('ip_hash').notNull(),
	count: integer('count').default(0)
})



export const likesLog = pgTable('likes_log', {
	slug: text('slug').notNull(),        // blogpost identifier
	ipHash: text('ip_hash').notNull(),   // SHA256 hash van IP
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});



export const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	slug: text('slug').notNull(),
	name: text('name').notNull(),
	body: text('body').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	slug: text('slug').notNull().unique(),
	body: text('body').notNull(),
	coverImage: text('cover_image'),
	mailed: boolean('mailed').default(false).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const subscribers = pgTable('subscribers', {
	id: serial('id').primaryKey(),
	email: text('email').notNull().unique(),
	unsubscribeToken: uuid('unsubscribe_token').defaultRandom().notNull(),
	subscribedAt: timestamp('subscribed_at').defaultNow().notNull()
});

export type Post = typeof posts.$inferSelect;

export type Subscriber = typeof subscribers.$inferSelect;

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Likes = typeof likes.$inferSelect
