"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScreenTransition } from "@/components/screen-transition";
import { BackButton } from "@/components/back-button";
import { NOTE_CARDS } from "@/app/constants";

export function NotesScreen({ onBack }: { onBack: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <ScreenTransition className="flex flex-col min-h-screen bg-linear-to-b from-rose-50 to-pink-50 px-4 py-8">
      <div className="flex items-center gap-4 mb-10">
        <BackButton onBack={onBack} />
        <h2
          className="text-2xl font-extrabold text-pink-600"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Notes for Debby 💌
        </h2>
      </div>

      <div className="flex flex-col items-center gap-14 pb-12">
        {NOTE_CARDS.map((card, i) => (
          <div
            key={card.id}
            className="w-full max-w-lg cursor-pointer select-none note-card-enter"
            style={{
              perspective: "1000px",
              animationDelay: `${i * 0.15}s`,
            }}
            onClick={() => toggle(card.id)}
          >
            {/* Front */}
            <div
              className={cn(
                "rounded-2xl overflow-hidden shadow-lg border-2 border-white/60 relative transition-all duration-500",
                card.bg,
                flipped.has(card.id) ? "hidden" : "block",
              )}
              style={{ minHeight: "220px" }}
            >
              <div
                className={cn(
                  "absolute top-1/2 left-0 right-0 h-6 -translate-y-1/2 opacity-60",
                  card.ribbon,
                )}
              />
              <div
                className={cn(
                  "absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 opacity-60",
                  card.ribbon,
                )}
              />
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-6 py-10">
                <span className="text-6xl">🎀</span>
                <p
                  className="text-lg font-bold text-center text-zinc-700"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {card.frontText}
                </p>
                <p className="text-sm text-zinc-500">tap to open</p>
              </div>
            </div>

            {/* Back */}
            <div
              className={cn(
                "rounded-2xl overflow-hidden shadow-xl flex transition-all duration-500",
                flipped.has(card.id) ? "block" : "hidden",
              )}
              style={{ backgroundColor: card.paperBg, minHeight: "220px" }}
            >
              {/* Margin strip */}
              <div
                className="w-10 shrink-0 flex flex-col items-center gap-24 pt-14"
                style={{ backgroundColor: card.marginBg }}
              >
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      backgroundColor: card.paperBg,
                      borderColor: card.lineColor,
                    }}
                  />
                ))}
              </div>

              {/* Paper content */}
              <div
                className="flex-1 px-4 pb-6"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 30px,
                    ${card.lineColor}55 30px,
                    ${card.lineColor}55 32px
                  )`,
                  backgroundSize: "100% 32px",
                }}
              >
                <div className="pt-1.5">
                  <p
                    className="text-sm text-zinc-700 whitespace-pre-line"
                    style={{
                      fontFamily: "var(--font-body)",
                      lineHeight: "32px",
                      letterSpacing: "0.3px",
                      margin: 0,
                      transform: "translateY(-2px)",
                    }}
                  >
                    {card.message}
                  </p>

                  <p
                    className="mt-2 text-xs text-zinc-400"
                    style={{
                      fontFamily: "var(--font-body)",
                      lineHeight: "32px",
                    }}
                  >
                    tap to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScreenTransition>
  );
}
