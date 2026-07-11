"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type VideoPreviewProps = {
  videoUrl: string;
  poster: string;
  title: string;
};

export function VideoPreview({ videoUrl, poster, title }: VideoPreviewProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setPlaying(true);
        trackEvent("video_play", { title });
      }}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl focus-visible:outline-gold"
      aria-label={`Воспроизвести видео: ${title}`}
    >
      <Image src={poster} alt={title} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-graphite/30 transition-colors group-hover:bg-graphite/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-graphite shadow-lg transition-transform group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-current" />
        </div>
      </div>
    </button>
  );
}
