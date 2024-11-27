import React from "react";
import { Message as TMessage } from "ai/react";
import Message from "./Message";
import { MessageSquare } from "lucide-react";

interface MessagesProps {
  messages: TMessage[];
  isLoading?: boolean;
}

const Messages = ({ messages, isLoading = false }: MessagesProps) => {
  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
      {messages.length ? (
        <>
          {messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              isUserMessage={message.role === "user"}
              isLoading={
                isLoading &&
                index === messages.length - 1 &&
                message.role === "assistant"
              }
            />
          ))}
          {isLoading && (
            <Message content="" isUserMessage={false} isLoading={true} />
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="text-xl font-semibold text-white">
            You&apos;re all caught up!
          </h3>
          <p className="text-zinc-500 text-sm">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
