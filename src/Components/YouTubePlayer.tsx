import React, { useEffect, useRef } from "react";

// 1. Define strict typing for the Component Props
interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  // 2. Strongly type the DOM container ref
  const playerRef = useRef<HTMLDivElement | null>(null);

  // 3. Type the player instance as 'any' to dynamically handle the external script methods
  const ytPlayerInstance = useRef<any>(null);

  useEffect(() => {
    // Access the global window object with dynamic type mapping
    const globalWindow = window as any;

    // 4. Initialize the player instance safely
    const loadPlayer = () => {
      if (globalWindow.YT && globalWindow.YT.Player && playerRef.current) {
        ytPlayerInstance.current = new globalWindow.YT.Player(
          playerRef.current,
          {
            height: "390",
            width: "640",
            videoId: videoId,
            playerVars: {
              playsinline: 1,
              autoplay: 0,
              controls: 1,
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
            },
          },
        );
      }
    };

    // 5. Explicitly type event handlers
    const onPlayerReady = (event: any) => {
      console.log("Player is ready!", event.target);
    };

    const onPlayerStateChange = (event: { data: number }) => {
      if (globalWindow.YT) {
        if (event.data === globalWindow.YT.PlayerState.PLAYING) {
          console.log("Video is playing...");
        } else if (event.data === globalWindow.YT.PlayerState.PAUSED) {
          console.log("Video is paused.");
        }
      }
    };

    // 6. Check for script injection safely on mount
    if (!globalWindow.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      // Assign global callback hook
      globalWindow.onYouTubeIframeAPIReady = () => {
        loadPlayer();
      };
    } else {
      // Script is already in DOM, load player immediately
      loadPlayer();
    }

    // 7. Cleanup on Component Unmount
    return () => {
      if (
        ytPlayerInstance.current &&
        typeof ytPlayerInstance.current.destroy === "function"
      ) {
        ytPlayerInstance.current.destroy();
      }
    };
  }, [videoId]); // Triggers reload safely if videoId changes dynamically

  return (
    <div className="absolute flex justify-center items-center z-50  top-[29.5%] left-[17%] md:top-[28.3%] md:left-[37.1%] ">
      {/* Tailwind handles the aspect ratio scaling safely */}
      <div className="w-[54vw] h-[35vh] rounded-xl overflow-hidden shadow-2xl isolator md:w-[21.3vw] md:h-[38vh]">
        <div ref={playerRef} className="w-full h-full  bg-black"></div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
