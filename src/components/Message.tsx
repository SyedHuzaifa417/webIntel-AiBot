import { cn } from "@/lib/utlis";
import { Brain, User } from "lucide-react";
import React from "react";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

const Message = ({ content, isUserMessage }: MessageProps) => {
  return (
    <div
      className={cn("py-2", {
        "bg-zinc-800 flex justify-end": isUserMessage,
        "bg-zinc-900/25 flex justify-start": !isUserMessage,
      })}
    >
      <div className="p-6 max-w-3xl w-full mx-auto">
        <div
          className={cn("flex items-start gap-5", {
            "flex-row-reverse": isUserMessage,
            "flex-row": !isUserMessage,
          })}
        >
          <div
            className={cn(
              "size-10 shrink-0  aspect-square rounded-full border border-zinc-500 bg-fuchsia-800/80 flex items-center justify-center",
              {
                "bg-blue-900/60 border-blue-700 text-zinc-200": isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Brain className="size-5 text-white" />
            )}
          </div>
          <div
            className={cn("flex flex-col w-full", {
              "ml-6 items-end": isUserMessage,
              "mr-6 items-start": !isUserMessage,
            })}
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Website"}
              </span>
            </div>
            <p
              className={cn(
                "text-sm font-normal py-2.5 text-gray-900 dark:text-gray-200",
                {
                  "text-right": isUserMessage,
                  "text-left": !isUserMessage,
                }
              )}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
