import ChatWrapper from "@/components/ChatWrapper";
import { redis } from "@/lib/radis";
import { ragChat } from "@/lib/ragChat";
import React from "react";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

/*creating a function that reconstructs the url*/
const reconstructUrl = ({ url }: { url: string[] }) => {
  const decodedComponent = url.map((compValue) =>
    decodeURIComponent(compValue)
  );
  return decodedComponent.join("/");
};

const UrlPage = async ({ params }: PageProps) => {
  //to get the originial url intead of https%3A etc
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  //to avoid loading the same data multiple times on reload
  const isAlreadyIndexed = await redis.sismember(
    "indexedUrls",
    reconstructedUrl
  );

  const sessionId = "mock-session-id";

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

  return <ChatWrapper sessionId={sessionId} />;
};

export default UrlPage;

// like when we create a route for about we create a folder named about and then inside we create a file named page.tsx
// this is the slug folder which catches all the routes so we use [...] to catch all the routes which comes after the url of our website /
