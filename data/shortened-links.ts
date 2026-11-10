import "server-only";

import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import db from "../db";
import { shortenedLinks } from "../db/schema";

export async function getCurrentUserLinks() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return db
    .select({
      shortCode: shortenedLinks.shortCode,
      url: shortenedLinks.url,
      createdAt: shortenedLinks.createdAt,
    })
    .from(shortenedLinks)
    .where(eq(shortenedLinks.clerkUserId, userId))
    .orderBy(desc(shortenedLinks.createdAt));
}
