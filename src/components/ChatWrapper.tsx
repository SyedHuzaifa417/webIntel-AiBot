"use client";

import { Message, useChat } from "ai/react";
import React, { useState } from "react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";

const ChatWrapper = ({
  sessionId,
  initialMessage,
}: {
  sessionId: string;
  initialMessage: Message[];
}) => {
  const {
    messages,
    handleInputChange,
    input,
    handleSubmit: originalHandleSubmit,
    setInput,
  } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages: initialMessage,
    onFinish: () => {
      setIsLoading(false);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    setIsLoading(true);
    await originalHandleSubmit();
  };

  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 flex flex-col justify-between">
        <Messages messages={messages} isLoading={isLoading} />
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
