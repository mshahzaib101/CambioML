/**
 * This module is just mock data, intended to make it easier to develop and style the logger
 */
import { StreamingLog } from "../../../lib/multimodal-live-client";

export const mockLogs: StreamingLog[] = [
  {
    timestamp: Date.now() - 3600000,
    type: "send",
    source: "client",
    message: {
      parts: [{ text: "Hello, how can you help me today?" }],
    },
    count: 1,
  },
  {
    timestamp: Date.now() - 3590000,
    type: "receive",
    source: "server",
    message: {
      parts: [
        {
          text: "Hi there! I'm an AI assistant. I can help you with information, answering questions, generating content, and more. What would you like to talk about today?",
        },
      ],
    },
    count: 1,
  },
  {
    timestamp: Date.now() - 3500000,
    type: "send",
    source: "client",
    message: {
      parts: [{ text: "Can you tell me about the latest advances in AI?" }],
    },
    count: 1,
  },
  {
    timestamp: Date.now() - 3490000,
    type: "receive",
    source: "server",
    message: {
      parts: [
        {
          text: "There have been several significant advances in AI recently. Large language models have improved dramatically in capabilities, multimodal models can now process text, images, audio, and video together, and there are exciting developments in AI agents that can perform complex reasoning and take actions. Would you like me to elaborate on any of these areas?",
        },
      ],
    },
    count: 1,
  },
  {
    timestamp: Date.now() - 60000,
    type: "audio",
    source: "server",
    message: "Audio data received",
    count: 5,
  },
  {
    timestamp: Date.now() - 30000,
    type: "TOOL_USE",
    source: "server",
    message: {
      name: "searchWeather",
      input: { location: "San Francisco" },
      output: { temperature: 65, conditions: "Partly Cloudy" },
    },
    count: 1,
  },
];
