"use client";

import { useChat } from "ai/react";
import React from "react";

const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const { messages, handleInputChange, input, handleSubmit } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
  });
  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 flex flex-col justify-between">
        {JSON.stringify(messages)}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit"> Send</button>
      </form>
    </div>
  );
};

export default ChatWrapper;
