import ChatWrapper from "@/components/ChatWrapper";
import { redis } from "@/lib/radis";
import { ragChat } from "@/lib/ragChat";
import { cookies } from "next/headers";
import React from "react";

interface PageProps {
  params: {
    url: string[];
  };
}

/*creating a function that reconstructs the url*/
const reconstructUrl = (url: string[]) => {
  const decodedComponent = url.map((compValue) =>
    decodeURIComponent(compValue)
  );
  return decodedComponent.join("//");
};

const UrlPage = async ({ params }: PageProps) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("sessionId")?.value;
  //to get the originial url intead of https%3A etc
  const resolveedParams = await params;
  const reconstructedUrl = reconstructUrl(resolveedParams.url);

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(
    /\//g,
    ""
  );

  //to avoid loading the same data multiple times on reload
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
};

export default UrlPage;

// like when we create a route for about we create a folder named about and then inside we create a file named page.tsx
// this is the slug folder which catches all the routes so we use [...] to catch all the routes which comes after the url of our website /
