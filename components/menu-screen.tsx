"use client";

import { cn } from "@/lib/utils";
import { ScreenTransition } from "@/components/screen-transition";
import type { Screen } from "@/app/types";

export function MenuScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const menuItems = [
    {
      label: "Notes 💌",
      sublabel: "Read something special",
      target: "notes" as Screen,
      bg: "bg-pink-100",
      border: "border-pink-200",
      text: "text-pink-600",
      icon: "💌",
    },
    {
      label: "Gallery 📸",
      sublabel: "Memories together",
      target: "gallery" as Screen,
      bg: "bg-rose-100",
      border: "border-rose-200",
      text: "text-rose-600",
      icon: "📸",
    },
  ];

  return (
    <ScreenTransition className="relative flex flex-1 flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden bg-gradient-to-b from-pink-50 to-rose-50">
      {/* Soft floating background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-10 left-6 text-4xl opacity-20 animate-pulse">
          💖
        </span>
        <span className="absolute bottom-16 right-6 text-4xl opacity-20 animate-bounce">
          🎈
        </span>
        <span className="absolute top-1/3 right-10 text-3xl opacity-20 animate-pulse">
          ✨
        </span>
        <span className="absolute bottom-1/3 left-10 text-3xl opacity-20 animate-bounce">
          🌸
        </span>
      </div>

      {/* Name */}
      <div className="mb-2 text-center overflow-hidden z-10">
        {"Deborah Ama Zenaba Kontoh".split(" ").map((word, wi) => (
          <span
            key={wi}
            className="inline-block mr-2 name-word"
            style={{
              animationDelay: `${wi * 0.12}s`,
              fontFamily: "var(--font-heading)",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2
        className="mb-8 text-2xl sm:text-3xl font-extrabold text-center text-pink-500 menu-fade-in z-10"
        style={{ fontFamily: "var(--font-heading)", animationDelay: "0.6s" }}
      >
        Choose your surprise 🎀
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xs sm:max-w-md z-10">
        {menuItems.map((card, i) => (
          <button
            key={card.target}
            type="button"
            onClick={() => setScreen(card.target)}
            className={cn(
              "menu-card-enter flex flex-col items-center gap-3 p-6 rounded-2xl border-2 shadow-md",
              "hover:scale-105 hover:shadow-lg active:scale-95",
              "transition-all duration-200 cursor-pointer text-center",
              card.bg,
              card.border,
            )}
            style={{ animationDelay: `${0.2 + i * 0.15}s` }}
          >
            <span className="text-5xl">{card.icon}</span>

            <span
              className={cn("text-lg font-bold leading-tight", card.text)}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {card.label}
            </span>

            <span
              className="text-sm text-zinc-400 leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {card.sublabel}
            </span>
          </button>
        ))}
      </div>

      {/* Small footer text (fills space nicely) */}
      <p
        className="mt-10 text-xs text-pink-300 text-center z-10"
        style={{ fontFamily: "var(--font-body)" }}
      >
        Made with love 💖
      </p>
    </ScreenTransition>
  );
}
