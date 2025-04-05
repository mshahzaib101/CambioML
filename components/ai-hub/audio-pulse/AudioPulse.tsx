"use client";

import { useEffect } from "react";

type AudioPulseProps = {
  volume?: number;
  active?: boolean;
  hover?: boolean;
};

/**
 * Creates a visual representation of audio level
 */
export default function AudioPulse({
  volume = 0,
  active = false,
  hover = true,
}: AudioPulseProps) {
  // Update the CSS variable to drive the animation
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--volume",
      `${Math.max(5, Math.min(volume * 200, 24))}px`
    );
  }, [volume]);

  // Number of pulse lines to render
  const pulseCount = 3;

  return (
    <div
      className={`flex items-center justify-center space-x-1 h-full w-full transition-opacity ${
        !active ? "opacity-30" : "opacity-100"
      }`}
    >
      {[...Array(pulseCount)].map((_, i) => {
        // Calculate height multiplier for each bar
        const heightMultiplier = active
          ? Math.max(0.3, Math.min(volume * 4 * (1 + i * 0.5), 1))
          : 0.3 + i * 0.15;

        const maxHeight = 24; // Maximum height in pixels
        const height = Math.floor(maxHeight * heightMultiplier);

        return (
          <div
            key={i}
            className={`w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 ${
              hover ? "group-hover:bg-violet-500 group-hover:animate-none" : ""
            }`}
            style={{
              height: `${height}px`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: "1s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationName: active ? "audioPulse" : "none",
              transformOrigin: "center",
            }}
          />
        );
      })}
    </div>
  );
}
