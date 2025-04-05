"use client";

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useLiveAPIContext } from "../../../contexts/LiveAPIContext";
import { UseMediaStreamResult } from "../../../hooks/use-media-stream-mux";
import { useScreenCapture } from "../../../hooks/use-screen-capture";
import { useWebcam } from "../../../hooks/use-webcam";
import { AudioRecorder } from "../../../lib/audio-recorder";
import AudioPulse from "@/components/ai-hub/audio-pulse/AudioPulse";
import { cn } from "@/lib/utils";

export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: string;
  offIcon: string;
  start: () => Promise<any>;
  stop: () => any;
  label: string;
  className?: string;
};

/**
 * Button used for triggering webcam or screen-capture
 */
const MediaStreamButton = ({
  isStreaming,
  onIcon,
  offIcon,
  start,
  stop,
  label,
  className,
}: MediaStreamButtonProps) =>
  isStreaming ? (
    <button
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(40,40,40,0.4)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] transition-all",
        "text-indigo-400 hover:bg-[rgba(50,50,50,0.5)]",
        className
      )}
      onClick={stop}
      title={`Stop ${label}`}
    >
      <span className="material-symbols-outlined">{onIcon}</span>
    </button>
  ) : (
    <button
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(40,40,40,0.4)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] transition-all",
        "text-neutral-400 hover:bg-[rgba(50,50,50,0.5)]",
        className
      )}
      onClick={start}
      title={`Start ${label}`}
    >
      <span className="material-symbols-outlined">{offIcon}</span>
    </button>
  );

function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] =
    useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);

  const { client, connected, connect, disconnect, volume } =
    useLiveAPIContext();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--volume",
      `${Math.max(5, Math.min(inVolume * 200, 8))}px`
    );
  }, [inVolume]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: "audio/pcm;rate=16000",
          data: base64,
        },
      ]);
    };
    if (connected && !muted && audioRecorder) {
      audioRecorder.on("data", onData).on("volume", setInVolume).start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off("data", onData).off("volume", setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }

    let timeoutId = -1;

    function sendVideoFrame() {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;

      if (!video || !canvas) {
        return;
      }

      const ctx = canvas.getContext("2d")!;
      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;
      if (canvas.width + canvas.height > 0) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 1.0);
        const data = base64.slice(base64.indexOf(",") + 1, Infinity);
        client.sendRealtimeInput([{ mimeType: "image/jpeg", data }]);
      }
      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    }
    if (connected && activeVideoStream !== null) {
      requestAnimationFrame(sendVideoFrame);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [connected, activeVideoStream, client, videoRef]);

  // Handler for swapping from one video-stream to the next
  const changeStreams = (next?: UseMediaStreamResult) => async () => {
    if (next) {
      const mediaStream = await next.start();
      setActiveVideoStream(mediaStream);
      onVideoStreamChange(mediaStream);
    } else {
      setActiveVideoStream(null);
      onVideoStreamChange(null);
    }

    videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
  };

  return (
    <section className="bg-[rgba(35,35,35,0.7)] py-4 px-6">
      <canvas style={{ display: "none" }} ref={renderCanvasRef} />

      <div className="flex items-center justify-between">
        <div
          className={cn("flex items-center space-x-4", {
            "opacity-50 pointer-events-none": !connected,
          })}
        >
          <button
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.08)] shadow-md transition-all",
              muted
                ? "bg-[rgba(200,50,50,0.15)] text-red-400 hover:bg-[rgba(200,50,50,0.2)]"
                : "bg-[rgba(50,50,200,0.15)] text-indigo-400 hover:bg-[rgba(50,50,200,0.2)]"
            )}
            onClick={() => setMuted(!muted)}
            title={muted ? "Unmute" : "Mute"}
            disabled={!connected}
          >
            <span className="material-symbols-outlined filled">
              {!muted ? "mic" : "mic_off"}
            </span>
          </button>

          <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(40,40,40,0.4)] overflow-hidden">
            <AudioPulse volume={volume} active={connected} hover={false} />
          </div>

          {supportsVideo && (
            <>
              <MediaStreamButton
                isStreaming={screenCapture.isStreaming}
                start={changeStreams(screenCapture)}
                stop={changeStreams()}
                onIcon="cancel_presentation"
                offIcon="present_to_all"
                label="screen sharing"
                className={
                  screenCapture.isStreaming
                    ? "bg-[rgba(50,200,50,0.15)] text-green-400 hover:bg-[rgba(50,200,50,0.2)]"
                    : ""
                }
              />
              <MediaStreamButton
                isStreaming={webcam.isStreaming}
                start={changeStreams(webcam)}
                stop={changeStreams()}
                onIcon="videocam_off"
                offIcon="videocam"
                label="webcam"
                className={
                  webcam.isStreaming
                    ? "bg-[rgba(50,200,50,0.15)] text-green-400 hover:bg-[rgba(50,200,50,0.2)]"
                    : ""
                }
              />
            </>
          )}
          {children}
        </div>

        <div className="flex items-center space-x-3">
          <span
            className={cn(
              "text-sm font-medium",
              connected ? "text-indigo-400" : "text-neutral-500"
            )}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>

          <button
            className={cn(
              "flex items-center justify-center rounded-xl w-14 h-14 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgba(30,30,30,0.7)]",
              connected
                ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                : "bg-gradient-to-br from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 focus:ring-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]"
            )}
            onClick={connected ? disconnect : connect}
            title={connected ? "Disconnect" : "Connect"}
          >
            <span className="material-symbols-outlined filled text-2xl">
              {connected ? "pause" : "play_arrow"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ControlTray;
