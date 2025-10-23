import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // handle play/pause logic
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.warn("Audio play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // handle songs ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?._id;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      // reset the playback position
      audio.currentTime = 0;

      prevSongRef.current = currentSong?._id;

      if (isPlaying) {
        audio.play().catch((err) => console.warn("Audio autoplay error:", err));
      }
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} preload="metadata" />;
};

export default AudioPlayer;
