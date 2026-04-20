"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ConfettiLayer } from "@/components/confetti-layer";
import { FLOATING_EMOJIS } from "@/app/constants";
import type { ConfettiPiece } from "@/app/types";

type WelcomeScreenProps = {
  onEnter: () => void;
  confetti: ConfettiPiece[];
  exiting: boolean;
};

export function WelcomeScreen({
  onEnter,
  confetti,
  exiting,
}: WelcomeScreenProps) {
  const [phase, setPhase] = useState<"greeting" | "main">("greeting");
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setIntro(false), 1200);
    const t2 = setTimeout(() => setPhase("main"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="relative flex flex-1 flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{
        background: intro
          ? "#000"
          : "linear-gradient(to bottom, #ffe4e6, #fff1f2, #fffbeb)",
        transition: "background 1.5s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting
          ? "translateY(-40px) scale(0.97)"
          : "translateY(0) scale(1)",
        transitionProperty: "opacity, transform, background",
        transitionDuration: "0.5s, 0.5s, 1.5s",
      }}
    >
      {/* Black intro overlay */}
      <div
        className="absolute inset-0 bg-black z-20 pointer-events-none"
        style={{
          opacity: intro ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      <ConfettiLayer pieces={confetti} />

      {FLOATING_EMOJIS.map(({ emoji, pos, delay }) => (
        <span
          key={pos}
          className={cn(
            "absolute text-3xl sm:text-4xl animate-bounce select-none",
            pos,
          )}
          style={{ animationDelay: delay }}
          aria-hidden="true"
        >
          {emoji}
        </span>
      ))}

      {phase === "greeting" && (
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
          <span
            className="birthday-pop text-7xl sm:text-8xl"
            style={{ animationDelay: "0s" }}
            aria-hidden="true"
          >
            🎂
          </span>
          <h1
            className="birthday-pop text-5xl font-extrabold text-pink-600 sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--font-heading)",
              animationDelay: "0.25s",
            }}
          >
            For
          </h1>
          <h2
            className="birthday-pop text-4xl font-extrabold text-rose-400 sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "var(--font-heading)",
              animationDelay: "0.55s",
            }}
          >
            Deborah Ama Zenaba Kontoh 💖 🎉
          </h2>
          <div
            className="birthday-pop flex gap-3 text-4xl mt-2"
            style={{ animationDelay: "0.8s" }}
            aria-hidden="true"
          >
            🎈 🌸 💖 🌸 🎈
          </div>
        </div>
      )}

      {phase === "main" && (
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center fade-in-up">
          {/* Full name animation */}
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 overflow-hidden">
            {"💖Happy Birthday ".split(" ").map((word, wi) => (
              <span
                key={wi}
                className="name-word-hero inline-block text-4xl font-extrabold text-rose-400 sm:text-5xl md:text-6xl drop-shadow-sm"
                style={{
                  fontFamily: "var(--font-heading)",
                  animationDelay: `${wi * 0.18}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl font-extrabold leading-tight tracking-tight text-pink-600 sm:text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-heading)",
              textShadow: "0 0 25px rgba(244, 114, 182, 0.35)",
            }}
          >
            Debby 🎉
          </h1>

          <p
            className="text-lg font-medium text-pink-400 sm:text-xl max-w-xs"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A special day deserves a special surprise...
          </p>

          <button
            type="button"
            className="btn-pulse mt-2 px-10 py-4 text-lg font-bold text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            style={{ fontFamily: "var(--font-heading)" }}
            onClick={onEnter}
          >
            Tap to start
          </button>
        </div>
      )}
    </div>
  );
}
