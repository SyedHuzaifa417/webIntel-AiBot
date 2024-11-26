"use client";

import { Message, useChat } from "ai/react";
import React from "react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";

const ChatWrapper = ({
  sessionId,
  initialMessage,
}: {
  sessionId: string;
  initialMessage: Message[];
}) => {
  const { messages, handleInputChange, input, handleSubmit, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: { sessionId },
      initialMessages: initialMessage,
    });
  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 flex flex-col justify-between">
        <Messages messages={messages} />
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatWrapper;
