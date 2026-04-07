"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

const INITIAL_VOLUME = 0.68;
const TRACKS = [
  {
    id: "night-switch",
    title: "Night Switch",
    subtitle: "Angular indie-rock energy",
    src: "/diverse_five_song_set_v1/01_night_switch.wav",
  },
  {
    id: "city-static",
    title: "City Static",
    subtitle: "Punchy jangle and fast motion",
    src: "/diverse_five_song_set_v1/02_city_static.wav",
  },
  {
    id: "neon-ritual",
    title: "Neon Ritual",
    subtitle: "Colorful art-pop groove",
    src: "/diverse_five_song_set_v1/03_neon_ritual.wav",
  },
  {
    id: "satellite-romance",
    title: "Satellite Romance",
    subtitle: "Retro-futurist synth-pop hook",
    src: "/diverse_five_song_set_v1/04_satellite_romance.wav",
  },
  {
    id: "afterglow-complex",
    title: "Afterglow Complex",
    subtitle: "Dreamy club euphoria",
    src: "/diverse_five_song_set_v1/05_afterglow_complex.wav",
  },
] as const;

function formatTime(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return "00:00";
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function RetroMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(INITIAL_VOLUME);
  const tracks = TRACKS;
  const currentTrack = tracks[trackIndex];

  const handleTrackStep = (direction: -1 | 1) => {
    if (!tracks.length) {
      return;
    }

    setCurrentTime(0);
    setTrackIndex((currentIndex) => {
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0) {
        return tracks.length - 1;
      }

      if (nextIndex >= tracks.length) {
        return 0;
      }

      return nextIndex;
    });
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextTime = Math.min(Math.max(value, 0), duration || 0);

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleStop = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleMediaTrackStep = useEffectEvent((direction: -1 | 1) => {
    handleTrackStep(direction);
  });

  const handleMediaSeek = useEffectEvent((value: number) => {
    handleSeek(value);
  });

  const handleMediaStop = useEffectEvent(() => {
    handleStop();
  });

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    audio.src = currentTrack.src;
    audio.load();
    audio.currentTime = 0;
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    audio.pause();
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleLoadStart = () => {
      setCurrentTime(0);
      setDuration(0);
    };

    const handlePause = () => {
      if (audio.ended) {
        return;
      }

      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleEnded = () => {
      if (tracks.length <= 1) {
        setIsPlaying(false);
        setCurrentTime(0);
        return;
      }

      setCurrentTime(0);
      setIsPlaying(true);
      setTrackIndex((currentIndex) => (currentIndex + 1) % tracks.length);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks.length]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator) || !currentTrack) {
      return;
    }

    const mediaSession = navigator.mediaSession;

    mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: "Gutter Fairy",
      album: "Studio Playlist",
      artwork: [
        {
          src: "/apple-touch-fairy.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
    mediaSession.playbackState = isPlaying ? "playing" : "paused";

    mediaSession.setActionHandler("play", () => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    });

    mediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause();
    });

    mediaSession.setActionHandler("stop", () => {
      handleMediaStop();
    });

    mediaSession.setActionHandler("previoustrack", () => {
      handleMediaTrackStep(-1);
    });

    mediaSession.setActionHandler("nexttrack", () => {
      handleMediaTrackStep(1);
    });

    mediaSession.setActionHandler("seekbackward", (details) => {
      handleMediaSeek(currentTime - (details.seekOffset ?? 10));
    });

    mediaSession.setActionHandler("seekforward", (details) => {
      handleMediaSeek(currentTime + (details.seekOffset ?? 10));
    });

    mediaSession.setActionHandler("seekto", (details) => {
      if (typeof details.seekTime !== "number") {
        return;
      }

      handleMediaSeek(details.seekTime);
    });

    if ("setPositionState" in mediaSession && duration > 0) {
      try {
        mediaSession.setPositionState({
          duration,
          playbackRate: 1,
          position: Math.min(currentTime, duration),
        });
      } catch {
        // Ignore unsupported position updates.
      }
    }

    return () => {
      mediaSession.setActionHandler("play", null);
      mediaSession.setActionHandler("pause", null);
      mediaSession.setActionHandler("stop", null);
      mediaSession.setActionHandler("previoustrack", null);
      mediaSession.setActionHandler("nexttrack", null);
      mediaSession.setActionHandler("seekbackward", null);
      mediaSession.setActionHandler("seekforward", null);
      mediaSession.setActionHandler("seekto", null);
    };
  }, [currentTrack, currentTime, duration, isPlaying, tracks.length]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`retro-player ${isMinimized ? "retro-player--minimized" : ""}`.trim()}
      aria-label="Site music player"
    >
      <div className="site-shell">
        {isMinimized ? (
          <div className="retro-player__mini">
            <button
              type="button"
              className="retro-player__button retro-player__button--play"
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause track" : "Play track"}
              disabled={!currentTrack}
            >
              {isPlaying ? "||" : ">"}
            </button>

            <div className="retro-player__mini-copy">
              <p className="retro-player__mini-label">Now playing</p>
              <p className="retro-player__mini-title">
                {currentTrack?.title ?? "Loading player"}
              </p>
            </div>

            <div className="retro-player__mini-status">
              <span className="retro-player__time">{formatTime(currentTime)}</span>
              <span className="retro-player__divider">/</span>
              <span className="retro-player__time">{formatTime(duration)}</span>
            </div>

            <button
              type="button"
              className="retro-player__chrome-button"
              onClick={() => setIsMinimized(false)}
              aria-label="Expand music player"
              data-ui-sound="expand"
            >
              ▢
            </button>
          </div>
        ) : (
          <>
            <div className="retro-player__topbar">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.01}
                value={Math.min(currentTime, duration || 1)}
                onChange={(event) => handleSeek(Number(event.target.value))}
                className="retro-player__seek"
                aria-label="Song progress"
              />
              <button
                type="button"
                className="retro-player__chrome-button"
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize music player"
                data-ui-sound="minimize"
              >
                _
              </button>
            </div>

            <div className="retro-player__panel">
              <div className="retro-player__transport" role="group" aria-label="Player controls">
                <button
                  type="button"
                  className="retro-player__button"
                  onClick={() => handleTrackStep(-1)}
                  aria-label="Previous track"
                  disabled={tracks.length <= 1}
                >
                  {"<<"}
                </button>
                <button
                  type="button"
                  className="retro-player__button retro-player__button--play"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? "Pause track" : "Play track"}
                  disabled={!currentTrack}
                >
                  {isPlaying ? "||" : ">"}
                </button>
                <button
                  type="button"
                  className="retro-player__button"
                  onClick={handleStop}
                  aria-label="Stop track"
                  disabled={!currentTrack}
                >
                  {"[]"}
                </button>
                <button
                  type="button"
                  className="retro-player__button"
                  onClick={() => handleTrackStep(1)}
                  aria-label="Next track"
                  disabled={tracks.length <= 1}
                >
                  {">>"}
                </button>
              </div>

              <div className="retro-player__song">
                <div className={`retro-player__equalizer ${isPlaying ? "retro-player__equalizer--active" : ""}`} aria-hidden="true">
                  {Array.from({ length: 8 }, (_, index) => (
                    <span key={index} className="retro-player__bar" />
                  ))}
                </div>

                <div className="retro-player__copy">
                  <p className="retro-player__label">
                    Song: {currentTrack?.title ?? "Loading player"}
                  </p>
                  <p className="retro-player__subtitle">
                    {currentTrack?.subtitle ?? "building retro mix"}
                  </p>
                </div>
              </div>

              <div className="retro-player__status">
                <span className="retro-player__time">{formatTime(currentTime)}</span>
                <span className="retro-player__divider">/</span>
                <span className="retro-player__time">{formatTime(duration)}</span>
              </div>

              <label className="retro-player__volume-shell">
                <span className="retro-player__volume-label">Vol</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="retro-player__volume"
                  aria-label="Volume"
                />
              </label>

              <div className="retro-player__gloss" style={{ width: `${Math.max(progress, 10)}%` }} />
            </div>
          </>
        )}

        <audio ref={audioRef} preload="metadata" />
      </div>
    </div>
  );
}
