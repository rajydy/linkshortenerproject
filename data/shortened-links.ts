import "server-only";

import { randomBytes } from "node:crypto";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import db from "../db";
import { shortenedLinks } from "../db/schema";

const MAX_URL_LENGTH = 2048;
const SHORT_CODE_ATTEMPTS = 5;

export type CreateShortenedLinkResult =
  | { success: true; shortCode: string }
  | { success: false; error: string };

export type ShortenedLinkMutationResult =
  | { success: true }
  | { success: false; error: string };

type DestinationUrlResult =
  | { success: true; url: string }
  | { success: false; error: string };

function validateDestinationUrl(input: unknown): DestinationUrlResult {
  if (typeof input !== "string" || input.trim().length === 0) {
    return { success: false, error: "Enter a destination URL." };
  }

  const trimmedUrl = input.trim();
  if (trimmedUrl.length > MAX_URL_LENGTH) {
    return {
      success: false,
      error: `URLs must be ${MAX_URL_LENGTH} characters or fewer.`,
    };
  }

  let destination: URL;
  try {
    destination = new URL(trimmedUrl);
  } catch {
    return {
      success: false,
      error: "Enter a valid URL, including https:// or http://.",
    };
  }

  if (destination.protocol !== "https:" && destination.protocol !== "http:") {
    return {
      success: false,
      error: "Only HTTP and HTTPS destination URLs are supported.",
    };
  }

  return { success: true, url: destination.toString() };
}

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

export async function getShortenedLinkDestination(
  shortCode: string,
): Promise<string | null> {
  const [link] = await db
    .select({ url: shortenedLinks.url })
    .from(shortenedLinks)
    .where(eq(shortenedLinks.shortCode, shortCode))
    .limit(1);

  return link?.url ?? null;
}

export async function createShortenedLink(
  input: unknown,
): Promise<CreateShortenedLinkResult> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const destination = validateDestinationUrl(input);
  if (!destination.success) {
    return destination;
  }

  for (let attempt = 0; attempt < SHORT_CODE_ATTEMPTS; attempt += 1) {
    const shortCode = randomBytes(6).toString("base64url");
    const [createdLink] = await db
      .insert(shortenedLinks)
      .values({
        shortCode,
        clerkUserId: userId,
        url: destination.url,
      })
      .onConflictDoNothing({ target: shortenedLinks.shortCode })
      .returning({ shortCode: shortenedLinks.shortCode });

    if (createdLink) {
      return { success: true, shortCode: createdLink.shortCode };
    }
  }

  return {
    success: false,
    error: "Could not generate a unique short code. Please try again.",
  };
}

export async function updateShortenedLink(
  shortCode: unknown,
  input: unknown,
): Promise<ShortenedLinkMutationResult> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  if (typeof shortCode !== "string" || shortCode.trim().length === 0) {
    return { success: false, error: "This link could not be found." };
  }

  const destination = validateDestinationUrl(input);
  if (!destination.success) {
    return destination;
  }

  const [updatedLink] = await db
    .update(shortenedLinks)
    .set({ url: destination.url, updatedAt: new Date() })
    .where(
      and(
        eq(shortenedLinks.shortCode, shortCode),
        eq(shortenedLinks.clerkUserId, userId),
      ),
    )
    .returning({ shortCode: shortenedLinks.shortCode });

  if (!updatedLink) {
    return {
      success: false,
      error: "This link could not be found or is no longer available.",
    };
  }

  return { success: true };
}

export async function deleteShortenedLink(
  shortCode: unknown,
): Promise<ShortenedLinkMutationResult> {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  if (typeof shortCode !== "string" || shortCode.trim().length === 0) {
    return { success: false, error: "This link could not be found." };
  }

  const [deletedLink] = await db
    .delete(shortenedLinks)
    .where(
      and(
        eq(shortenedLinks.shortCode, shortCode),
        eq(shortenedLinks.clerkUserId, userId),
      ),
    )
    .returning({ shortCode: shortenedLinks.shortCode });

  if (!deletedLink) {
    return {
      success: false,
      error: "This link could not be found or is no longer available.",
    };
  }

  return { success: true };
}
