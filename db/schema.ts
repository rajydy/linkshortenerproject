import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const shortenedLinks = pgTable(
  "shortened_links",
  {
    shortCode: text("short_code").primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("shortened_links_clerk_user_id_created_at_idx").on(
      table.clerkUserId,
      table.createdAt,
    ),
  ],
);

export type ShortenedLink = typeof shortenedLinks.$inferSelect;
export type NewShortenedLink = typeof shortenedLinks.$inferInsert;