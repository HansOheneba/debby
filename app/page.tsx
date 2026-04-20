"use client";

import { useRef, useState } from "react";
import { WelcomeScreen } from "@/components/welcome-screen";
import { MenuScreen } from "@/components/menu-screen";
import { GalleryScreen } from "@/components/gallery-screen";
import { NotesScreen } from "@/components/notes-screen";
import { makeConfetti } from "@/app/constants";
import type { Screen, ConfettiPiece } from "@/app/types";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [confetti] = useState<ConfettiPiece[]>(() => makeConfetti());
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const enterApp = () => {
    audioRef.current?.play().catch(() => {});
    setWelcomeExiting(true);
    setTimeout(() => setScreen("menu"), 520);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/cantstop.m4a" loop preload="auto" />

      {screen === "welcome" && (
        <WelcomeScreen
          onEnter={enterApp}
          confetti={confetti}
          exiting={welcomeExiting}
        />
      )}
      {screen === "menu" && <MenuScreen setScreen={setScreen} />}
      {screen === "gallery" && (
        <GalleryScreen onBack={() => setScreen("menu")} />
      )}
      {screen === "notes" && <NotesScreen onBack={() => setScreen("menu")} />}

      {screen !== "welcome" && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-pink-200 shadow-md text-lg hover:scale-110 active:scale-95 transition-all duration-200"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}
    </>
  );
}
