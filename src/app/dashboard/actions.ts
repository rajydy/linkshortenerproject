"use server";

import { revalidatePath } from "next/cache";
import {
  createShortenedLink,
  deleteShortenedLink,
  updateShortenedLink,
} from "../../../data/shortened-links";

export async function createLinkAction(formData: FormData) {
  const result = await createShortenedLink(formData.get("url"));

  if (result.success) {
    revalidatePath("/dashboard");
  }

  return result;
}

export async function updateLinkAction(
  shortCode: string,
  formData: FormData,
) {
  const result = await updateShortenedLink(shortCode, formData.get("url"));

  if (result.success) {
    revalidatePath("/dashboard");
  }

  return result;
}

export async function deleteLinkAction(shortCode: string) {
  const result = await deleteShortenedLink(shortCode);

  if (result.success) {
    revalidatePath("/dashboard");
  }

  return result;
}
