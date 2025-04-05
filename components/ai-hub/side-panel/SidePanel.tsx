"use client";

import { useEffect, useRef, useState } from "react";
import { useLiveAPIContext } from "@/contexts/LiveAPIContext";
import { useLoggerStore } from "@/lib/store-logger";
import Logger from "@/components/ai-hub/logger/Logger";
import { cn } from "@/lib/utils";

export default function SidePanel() {
  const { connected, client } = useLiveAPIContext();
  const [open, setOpen] = useState(true);
  const loggerRef = useRef<HTMLDivElement>(null);
  const loggerLastHeightRef = useRef<number>(-1);
  const { log, logs } = useLoggerStore();

  const [textInput, setTextInput] = useState("");
  const [selectedOption] = useState({
    value: "conversations",
    label: "Conversations",
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll the log to the bottom when new logs come in
  useEffect(() => {
    if (loggerRef.current) {
      const el = loggerRef.current;
      const scrollHeight = el.scrollHeight;
      if (scrollHeight !== loggerLastHeightRef.current) {
        el.scrollTop = scrollHeight;
        loggerLastHeightRef.current = scrollHeight;
      }
    }
  }, [logs]);

  // Listen for log events and store them
  useEffect(() => {
    client.on("log", log);
    return () => {
      client.off("log", log);
    };
  }, [client, log]);

  const handleSubmit = () => {
    if (!textInput.trim() || !connected) return;

    client.send([{ text: textInput }]);

    setTextInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "border-r border-gray-200 dark:border-gray-700 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 flex flex-col",
        open ? "w-80" : "w-14"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2
          className={cn(
            "font-semibold text-gray-900 dark:text-white transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          Chat
        </h2>
        <button
          className="z-10 flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <span className="material-symbols-outlined">
            {open ? "chevron_left" : "chevron_right"}
          </span>
        </button>
      </div>

      <div
        className={cn(
          "border-b border-gray-200 dark:border-gray-700 transition-all duration-200",
          open
            ? "px-4 py-2 opacity-100 h-auto"
            : "h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Conversations
          </span>

          <div
            className={cn(
              "text-sm font-medium",
              connected
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            {connected ? "🔵 Active" : "⏸️ Standby"}
          </div>
        </div>
      </div>

      <div
        ref={loggerRef}
        className={cn("flex-1 overflow-y-auto", open ? "block" : "hidden")}
      >
        <Logger filter="conversations" />
      </div>

      <div
        className={cn(
          "border-t border-gray-200 dark:border-gray-700 p-4 transition-all duration-200",
          !open && "hidden",
          !connected && "opacity-60 pointer-events-none"
        )}
      >
        <div className="relative">
          <textarea
            ref={inputRef}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 pr-10 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[80px] max-h-[120px]"
            placeholder={connected ? "Type a message..." : "Connect to chat..."}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={!connected}
          />
          <button
            className={cn(
              "absolute right-2 bottom-2 p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors",
              !textInput.trim() && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleSubmit}
            disabled={!connected || !textInput.trim()}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
