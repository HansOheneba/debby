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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const enterApp = () => {
    audioRef.current?.play().catch(() => {});
    setWelcomeExiting(true);
    setTimeout(() => setScreen("menu"), 520);
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
    </>
  );
}
