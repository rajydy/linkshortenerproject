import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { getShortenedLinkDestination } from "../../../../data/shortened-links";

export default function ShortLinkPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  return (
    <Suspense fallback={<p role="status">Redirecting...</p>}>
      <ShortLinkRedirect params={params} />
    </Suspense>
  );
}

async function ShortLinkRedirect({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;
  const destination = await getShortenedLinkDestination(shortCode);

  if (!destination) {
    notFound();
  }

  let destinationUrl: URL;
  try {
    destinationUrl = new URL(destination);
  } catch {
    notFound();
  }

  if (
    destinationUrl.protocol !== "https:" &&
    destinationUrl.protocol !== "http:"
  ) {
    notFound();
  }

  return redirect(destinationUrl.toString());
}
