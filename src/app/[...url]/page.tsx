import ChatWrapper from "@/components/ChatWrapper";
import { redis } from "@/lib/radis";
import { ragChat } from "@/lib/ragChat";
import { cookies } from "next/headers";
import React from "react";

// Use Next.js generated types for dynamic routes
export interface PageProps {
  params: {
    url: string[];
  };
}

const reconstructUrl = (url: string[]) => {
  return url.map(decodeURIComponent).join("//");
};

export default async function UrlPage({ params }: Readonly<PageProps>) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;

  const reconstructedUrl = reconstructUrl(params.url);

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(
    /\//g,
    ""
  );

  const isAlreadyIndexed = await redis.sismember(
    "indexedUrls",
    reconstructedUrl
  );

  const initialMessage = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

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

// Explicitly define metadata if needed
export async function generateMetadata({ params }: PageProps) {
  const reconstructedUrl = reconstructUrl(params.url);
  return {
    title: `Insights for ${reconstructedUrl}`,
  };
}

// like when we create a route for about we create a folder named about and then inside we create a file named page.tsx
// this is the slug folder which catches all the routes so we use [...] to catch all the routes which comes after the url of our website /
