import ChatWrapper from "@/components/ChatWrapper";
import { redis } from "@/lib/radis";
import { ragChat } from "@/lib/ragChat";
import { cookies } from "next/headers";
import React from "react";

export interface PageProps {
  params: {
    url: string[];
  };
}

/* Function to reconstruct the URL from a catch-all route */
const reconstructUrl = (url: string[]) => {
  const decodedComponents = url.map(decodeURIComponent);
  return decodedComponents.join("//");
};

export default async function UrlPage({
  params,
}: {
  params: { url: string[] };
}) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;

  // Reconstruct the URL
  const reconstructedUrl = reconstructUrl(params.url);

  // Generate a unique session ID
  const sessionId = (reconstructedUrl + "--" + (sessionCookie || "")).replace(
    /\//g,
    ""
  );

  // Check if the URL has already been indexed
  const isAlreadyIndexed = await redis.sismember(
    "indexedUrls",
    reconstructedUrl
  );

  const initialMessage = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  // Add the URL to the context if it's not already indexed
  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: {
        chunkOverlap: 50,
        chunkSize: 200,
      },
    });
    await redis.sadd("indexedUrls", reconstructedUrl);
  }

  return <ChatWrapper sessionId={sessionId} initialMessage={initialMessage} />;
}

/* Dynamic Metadata */
export async function generateMetadata({
  params,
}: {
  params: { url: string[] };
}) {
  const reconstructedUrl = reconstructUrl(params.url);

  return {
    title: `Insights for ${reconstructedUrl}`,
    description: `Get insights and context for the URL: ${reconstructedUrl}.`,
  };
}
