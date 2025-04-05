"use client";

import { useLoggerStore } from "../../../lib/store-logger";
import { cn } from "@/lib/utils";

export interface StreamingLog {
  date: Date;
  type: string;
  source?: string;
  message: any; // Use any type to accommodate all possible message formats
  count?: number;
}

export type LoggerFilterType = "conversations" | "tools" | "none";

export type LoggerProps = {
  filter: LoggerFilterType;
};

const filters: Record<LoggerFilterType, (log: StreamingLog) => boolean> = {
  conversations: (log) => {
    // Only show logs that are part of the conversation (text messages)
    // Include client.send messages with clientContent (user messages)
    if (
      log.type === "client.send" &&
      typeof log.message === "object" &&
      log.message.clientContent
    ) {
      return true;
    }

    // Include server.content messages with serverContent.modelTurn (AI responses)
    if (
      log.type === "server.content" &&
      typeof log.message === "object" &&
      log.message.serverContent?.modelTurn
    ) {
      return true;
    }

    return false;
  },
  tools: (log) => {
    // Only show logs that are tool use
    if (log.type === "TOOL_USE") {
      return true;
    }
    return false;
  },
  none: () => true,
};

export default function Logger({ filter = "none" }: LoggerProps) {
  const { logs } = useLoggerStore();
  const filterFn = filters[filter];

  return (
    <div className="h-full overflow-y-auto">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {logs.filter(filterFn).map((log, i) => {
          const timestamp = new Date(log.date);
          const formattedTime = timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          // Extract message content based on log type
          let messageContent = null;

          // Function to extract and format any kind of object for display
          const formatObject = (obj: any): string => {
            if (!obj) return "null";
            try {
              return JSON.stringify(obj, null, 2);
            } catch (e) {
              return String(obj);
            }
          };

          // Handle client.send (user) messages
          if (log.type === "client.send" && typeof log.message === "object") {
            if (log.message.clientContent) {
              // This is a normal user message
              const { clientContent } = log.message;
              messageContent = (
                <div className="text-gray-800 dark:text-gray-200 text-sm">
                  {clientContent.turns?.map((turn: any, turnIndex: number) => (
                    <div key={turnIndex}>
                      {turn.parts?.map((part: any, partIndex: number) => (
                        <p
                          key={`${turnIndex}-${partIndex}`}
                          className="mb-2 last:mb-0"
                        >
                          {part.text}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              );
            }
          }
          // Handle server.content (AI) messages
          else if (
            log.type === "server.content" &&
            typeof log.message === "object"
          ) {
            if (log.message.serverContent?.modelTurn) {
              // This is a normal AI response message
              const { modelTurn } = log.message.serverContent;
              messageContent = (
                <div className="text-gray-800 dark:text-gray-200 text-sm">
                  {modelTurn.parts?.map(
                    (part: any, j: number) =>
                      part.text && (
                        <p key={j} className="mb-2 last:mb-0">
                          {part.text}
                        </p>
                      )
                  )}
                </div>
              );
            }
          }

          // If none of the specific handlers matched, display a generic representation
          if (!messageContent && typeof log.message === "object") {
            messageContent = (
              <div className="text-gray-800 dark:text-gray-200 text-sm font-mono text-xs whitespace-pre-wrap">
                {formatObject(log.message)}
              </div>
            );
          } else if (!messageContent && typeof log.message === "string") {
            messageContent = (
              <div className="text-gray-800 dark:text-gray-200 text-sm">
                {log.message}
              </div>
            );
          }

          return (
            <li key={i} className={cn("p-4", "bg-white dark:bg-gray-800")}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formattedTime}
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    )}
                  >
                    User
                  </span>
                </div>
              </div>

              <div className="mt-2">{messageContent}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
