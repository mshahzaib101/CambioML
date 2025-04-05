"use client";

import { useRef, useState } from "react";
import { LiveAPIProvider } from "../../contexts/LiveAPIContext";
import SidePanel from "./side-panel/SidePanel";
import ControlTray from "./control-tray/ControlTray";
import { cn } from "@/lib/utils";
import { FaVideo, FaRobot } from "react-icons/fa";
import { GradientContainer } from "../gradient-container";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";

// Replace with your actual API key or use environment variable
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

// Card component similar to features Card
const AIHubCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(40,40,40,0.30)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const AIHub = () => {
  // Video reference for displaying the active stream (webcam or screen capture)
  const videoRef = useRef<HTMLVideoElement>(null);
  // Track the current video stream (screen capture, webcam, or null)
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <GradientContainer className="md:my-20">
      <div className="w-full min-h-screen text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-40">
          <div className="text-center mb-12">
            <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
              <FaRobot className="h-6 w-6 text-cyan-500" />
            </FeatureIconContainer>
            <Heading className="pt-4">AI Video Conferencing</Heading>
            <Subheading>
              Connect with AI through voice, video, and text interactions using
              our advanced video conferencing platform
            </Subheading>
          </div>

          <LiveAPIProvider url={uri} apiKey={API_KEY}>
            <AIHubCard className="overflow-hidden">
              <div className="flex flex-col md:flex-row h-[600px]">
                <SidePanel />

                <main className="flex-1 flex flex-col">
                  <div className="flex-1 relative flex items-center justify-center bg-[rgba(20,20,20,0.60)]">
                    {(!videoRef.current || !videoStream) && (
                      <div className="text-center z-10 p-8">
                        <div className="[perspective:400px] mx-auto mb-6">
                          <div
                            className="h-16 w-16 p-[4px] rounded-md bg-gradient-to-b from-neutral-800 to-neutral-950 mx-auto relative"
                            style={{
                              transform: "rotateX(25deg)",
                              transformOrigin: "center",
                            }}
                          >
                            <div className="bg-charcoal rounded-[5px] h-full w-full relative z-20 flex items-center justify-center">
                              <FaVideo className="h-6 w-6 text-cyan-500" />
                            </div>
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-[60%] mx-auto"></div>
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-cyan-600 blur-sm to-transparent h-[8px] w-[60%] mx-auto"></div>
                          </div>
                        </div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                          Start a Conversation
                        </h2>
                        <p className="text-sm font-normal text-neutral-400 max-w-md mx-auto">
                          Click the connect button below to begin streaming and
                          interacting with AI
                        </p>
                      </div>
                    )}

                    <video
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover",
                        {
                          hidden: !videoRef.current || !videoStream,
                        }
                      )}
                      ref={videoRef}
                      autoPlay
                      playsInline
                    />
                  </div>

                  <ControlTray
                    videoRef={videoRef}
                    supportsVideo={true}
                    onVideoStreamChange={setVideoStream}
                  />
                </main>
              </div>
            </AIHubCard>
          </LiveAPIProvider>
        </div>
      </div>
    </GradientContainer>
  );
};
