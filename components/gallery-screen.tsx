"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ScreenTransition } from "@/components/screen-transition";
import { BackButton } from "@/components/back-button";
import { MEDIA_ITEMS } from "@/app/constants";

export function GalleryScreen({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = MEDIA_ITEMS.length;

  const navigate = (dir: "left" | "right") => {
    if (animating) return;
    if (dir === "right" && index >= total - 1) return;
    if (dir === "left" && index <= 0) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (dir === "right" ? i + 1 : i - 1));
      setDirection(null);
      setAnimating(false);
    }, 320);
  };

  const goPrev = () => navigate("left");
  const goNext = () => navigate("right");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, animating]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
    setTouchStartX(null);
  };

  const current = MEDIA_ITEMS[index];

  const slideStyle: React.CSSProperties = animating
    ? {
        opacity: 0,
        transform:
          direction === "right" ? "translateX(-60px)" : "translateX(60px)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
      }
    : {
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 0.32s ease, transform 0.32s ease",
      };

  return (
    <ScreenTransition className="flex flex-col min-h-screen bg-zinc-950 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <BackButton onBack={onBack} />
        <h2
          className="text-xl font-extrabold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Gallery 📸
        </h2>
        <span
          className="text-sm text-zinc-400 tabular-nums"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {index + 1} / {total}
        </span>
      </div>

      {/* Swipe area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {index > 0 && (
          <button
            type="button"
            aria-label="Previous"
            onClick={goPrev}
            className="absolute left-2 z-10 text-5xl text-white/60 hover:text-white transition-colors px-2 py-6 hover:scale-110 active:scale-95"
          >
            ‹
          </button>
        )}

        <div
          className="w-full max-w-3xl flex items-center justify-center"
          style={slideStyle}
        >
          {current.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={current.src}
              src={current.src}
              alt={`Memory ${index + 1}`}
              className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />
          ) : (
            <video
              key={current.src}
              src={current.src}
              className="max-h-[78vh] w-auto max-w-full rounded-xl shadow-2xl"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>

        {index < total - 1 && (
          <button
            type="button"
            aria-label="Next"
            onClick={goNext}
            className="absolute right-2 z-10 text-5xl text-white/60 hover:text-white transition-colors px-2 py-6 hover:scale-110 active:scale-95"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 py-4 shrink-0 flex-wrap px-4">
        {MEDIA_ITEMS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to item ${i + 1}`}
            onClick={() => !animating && setIndex(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              i === index
                ? "bg-pink-400 w-4 h-2"
                : "bg-zinc-600 hover:bg-zinc-400 w-2 h-2",
            )}
          />
        ))}
      </div>
    </ScreenTransition>
  );
}
