import { createIframeLink } from "@/lib/utils";

function VideoPlayer({ videoId }: VideoPlayerProps) {
  return (
    <div className="video-player">
      <iframe
        src={createIframeLink(videoId)}
        loading="lazy"
        title="Video player"
        style={{ border: 0, zIndex: 50 }}
        allowFullScreen
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture"
      />
    </div>
  );
}

export default VideoPlayer;
