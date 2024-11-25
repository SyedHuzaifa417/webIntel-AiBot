import { ragChat } from "@/lib/ragChat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

//coming from chatWrapper
export const POST = async (req: NextRequest) => {
  const { messages, sessionId } = await req.json();
  //we are sending a question through input and then awaiting the message from the ragchat
  const lastMessage = messages[messages.length - 1].content;

  const response = await ragChat.chat(lastMessage, {
    streaming: true,
    sessionId,
  });

  return aiUseChatAdapter(response);
};
