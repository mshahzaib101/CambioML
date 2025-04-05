import { EventEmitter } from "eventemitter3";
import { GenerativeContentBlob, Part } from "@google/generative-ai";
import {
  ServerContent,
  StreamingLog,
  ToolCall,
  ToolCallCancellation,
} from "../../multimodal-live-types";

/**
 * Common interface for AI client events regardless of provider
 */
export interface AIClientEventTypes {
  open: () => void;
  log: (log: StreamingLog) => void;
  close: (ev: any) => void;
  audio: (data: ArrayBuffer) => void;
  content: (data: ServerContent) => void;
  interrupted: () => void;
  setupcomplete: () => void;
  turncomplete: () => void;
  toolcall: (toolCall: ToolCall) => void;
  toolcallcancellation: (toolcallCancellation: ToolCallCancellation) => void;
}

/**
 * Configuration for AI clients
 */
export interface AIClientConfig {
  model: string;
  systemInstruction?: { parts: Part[] };
  [key: string]: any;
}

/**
 * Connection parameters for AI clients
 */
export interface AIClientConnection {
  url?: string;
  apiKey: string;
  provider: "gemini" | "openai";
}

/**
 * Abstract base class for AI clients
 */
export abstract class BaseAIClient extends EventEmitter<AIClientEventTypes> {
  protected config: AIClientConfig | null = null;

  /**
   * Connect to the AI service
   */
  abstract connect(config: AIClientConfig): Promise<boolean>;

  /**
   * Disconnect from the AI service
   */
  abstract disconnect(): void;

  /**
   * Send content to the AI
   */
  abstract send(parts: Part | Part[], turnComplete?: boolean): void;

  /**
   * Send realtime input (audio, video) to the AI
   */
  abstract sendRealtimeInput(chunks: GenerativeContentBlob[]): void;

  /**
   * Log a message
   */
  abstract log(type: string, message: any): void;
}

/**
 * Factory function to create an appropriate AI client based on provider
 */
export function createAIClient(connection: AIClientConnection): BaseAIClient {
  const { provider } = connection;
  // This will be implemented in other files
  if (provider === "gemini") {
    throw new Error(
      "GeminiAIClient implementation should be imported separately"
    );
  } else if (provider === "openai") {
    throw new Error(
      "OpenAIClient implementation should be imported separately"
    );
  }
  throw new Error(`Unsupported AI provider: ${provider}`);
}
